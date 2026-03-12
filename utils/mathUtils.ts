export function convertStringToFloat(text : string) {
    
    const cleanedText = text.replace(/[^\d.]/g,'');
    return parseFloat(cleanedText);

}