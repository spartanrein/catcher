export const renderObject = (ctx, canvas,image, object, objectProps, ) => {
    object.render();
    if (objectProps.x <= 0) {
        objectProps.x = 0;
    } else if (objectProps.x > canvas.width){
        objectProps.x = canvas.width
    }
};

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}