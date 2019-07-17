import {Request, Response, Router} from "express";
import {BoardService} from "../services/BoardService";
import HTTPError from "../../../models/exceptions/HTTPError";
import {Project} from "../../../models/Project";

const router: Router = Router();

/**
 * Route GET /board/
 */
router.get('/',  (req: Request, res: Response): void => {
    BoardService.getBoard()
    .then((result: Array<Project>) => {
        // @ts-ignore
        let range: string  = req.headers.range;

        // Advertise pagination. Default page size: 10
        res.set('Content-Range', `page 1/${Math.ceil(result.length/10)}`);

        // If no range provided, all will be returned
        if (!range) {
            res.status(200)
            .send(result)
        }

        // Retrieve the page requested from the header
        let pageRequested: number = parseInt(range.split("=")[1]);
        if (!pageRequested) {
            res.status(400)
            .send({ error: "Range format is invalid" })
        }

        // And split the result into pages
        let pages: Array<Array<Project>> = [];

        while (result.length > 0) {
            pages.push(result.splice(0, 10));
        }

        // 416 if the page is outside of the range
        if (pageRequested > pages.length) {
            res.status(416)
            .send({ error: "Range Not Satisfiable"});
        }

        return pages[pageRequested - 1];

    })
    .then((result: Array<Project>) => {
        res.status(200)
        .send(result);
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    })

});

export const BoardController: Router = router;
