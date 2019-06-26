import { Request } from "express-serve-static-core";
import { IMain } from "./Main";

export type TRenderRoot = {
    render: (template: string, context: TRootContext) => void;
};

type TRootContext = {
    application: string;
    jsBundle: string;
    port: number;
};

// export interface IApplication extends IMain {
//     handleRoot: (_req: Request, res: TRenderRoot) => void
// }