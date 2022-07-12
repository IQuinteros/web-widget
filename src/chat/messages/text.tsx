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

        const bootbox = message.bootbox;
        //alert(bootbox);

        let onImageClicked = () => {
            var items = [
                {
                    type: "text",
                    title: "Fur",
                    description: "The fur of clouded leopards is...",
                    position: {
                        left: 100,
                        top: 50
                    },
                    sticky: true
                },
                {
                    type: "text",
                    title: "Fur",
                    description: "The fur of clouded leopards is...",
                    position: {
                        left: 300,
                        top: 140
                    },
                    link: {
                        url: 'https://www.google.cl',
                        label: 'Google'
                    },
                    sticky: true
                }
            ];

            const newWindowObject = window as any;
            //alert(newWindowObject);

            const interactiveParent = {
                display: 'flex',
                justifyContent: 'center'
            }

            const styleInteractiveDiv = {
                width: 'fit-content',
                height: '60vh',
                overflow: 'auto'
            };

            const styleInteractiveImage = {
                height: '100%',
            };

            let interactiveImage = <div style={interactiveParent}><div id="my-interactive-image" style={styleInteractiveDiv}>
                <img src={attachment.url} style={styleInteractiveImage}></img>
            </div></div>;
            let interactiveImageString = render.render(interactiveImage);

            newWindowObject.parent.bootbox.dialog({
                message: interactiveImageString,
                closeButton: true,
                title: 'Puntos de reciclaje comuna de Concepción',
                size: 'extra-large'
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
                        <button onClick={onImageClicked}><img src={attachment.url} style="max-width: 100%;" /></button>
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
