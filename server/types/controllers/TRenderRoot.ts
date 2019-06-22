export type TRenderRoot = {
    render: (template: string, context: TRootContext) => void;
};
type TRootContext = {
    application: string;
    jsBundle: string;
    port: number;
};
