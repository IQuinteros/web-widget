import { h, Component } from "preact";
import MessageType from "./messagetype";
import * as render from 'preact-render-to-string';
import { IMessageTypeProps } from "../../typings";
import * as $ from "jquery";

export default class TextType extends MessageType {

    constructor(){
        super();

        //this.forceUpdate(() => alert((window as any).bootbox));
    }

    render(props: IMessageTypeProps) {
        const message = props.message;
        const attachment = message.attachment;
        const additionalParameters = message.additionalParameters;

        const textObject = { __html: message.text };

        let messageItems:any = [];
        let imageTitle:string = '';
        if(additionalParameters != null) {
            if(additionalParameters.imgItems != null) messageItems = additionalParameters.imgItems;
            if(additionalParameters.imgTitle != null) imageTitle = additionalParameters.imgTitle;
        }

        let onImageClicked = () => {
            let items = messageItems === null? [] : messageItems;
            items = Object.keys(items).map((key) => items[key]);
            parent.window.console.log(items);


            const newWindowObject = window as any;
            //alert(newWindowObject);

            const interactiveParent = {
                display: 'flex',
                justifyContent: 'center'
            }

            const styleInteractiveDiv = {
                width: 'auto',
                /*maxHeight: '60vh',*/
                overflow: 'auto'
            };

            const styleInteractiveImage = {
                height: '720px',
            };

            let interactiveImage = <div style={interactiveParent}><div id="my-interactive-image" style={styleInteractiveDiv}>
                <img src={attachment.url} style={styleInteractiveImage}></img>
            </div></div>;
            let interactiveImageString = render.render(interactiveImage);

            newWindowObject.parent.bootbox.dialog({
                message: interactiveImageString,
                closeButton: true,
                title: imageTitle,
                size: 'large',
                className: 'interactiveImgStyle',
                onEscape: true,
                backdrop: true
            });
            let imageOptions = {
                shareBox: false
            };

            (newWindowObject.parent.$("#my-interactive-image") as any).interactiveImage(items, imageOptions);
        };


        return (
            <div>

                {additionalParameters != null && additionalParameters.link? (
                    <a href={additionalParameters.link} target="_blank"><p dangerouslySetInnerHTML={textObject}/></a>
                ) : (
                    <p dangerouslySetInnerHTML={textObject} />
                )}

                {attachment && attachment.type === "image" ? (
                    <div>
                        <button onClick={onImageClicked} class="btn"><img src={attachment.url} style="max-width: 100%;" /></button>
                    </div>
                ) : (
                    ""
                )}
                {attachment && attachment.type === "audio" ? (
                    <audio controls autoPlay={false} style="max-width: 100%;">
                        <source src={attachment.url} type="audio/mp3" />
                    </audio>
                ) : (
                    ""
                )}
                {attachment && attachment.type === "video" ? (
                    <video
                        height={props.conf.videoHeight}
                        controls
                        autoPlay={false}
                        style="max-width: 100%;"
                    >
                        <source src={attachment.url} type="video/mp4" />
                    </video>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
