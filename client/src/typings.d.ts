/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var Modernizr;

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends ProgressEvent {
    target: FileReaderEventTarget;
}
