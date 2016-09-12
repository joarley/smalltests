function getTextLayer(target) {
// this basically loops all the layers to find the
// upmost text layer with the content #nn... and returns it
    if (target == null) return false;
    var layers      = target.layers,
        layerLen    = layers.length;
    for (var i = 0; i < layerLen; i++) {
    	var layer       = layers[i],
            isLayerSet  = layer.typename == 'pessoa',
            isValid     = layer.kind == LayerKind.TEXT &&
                          "[[nome]]" == layer.textItem.contents;
            // we're allowing spaces around the text just in case
        if (!isLayerSet && !isValid) continue;
        if (isLayerSet) {
            var found = getTextLayer(layer);
            if (found) return found;
        } else return layer;
    }
    return false;
}



app.activeDocument.save();
oriDoc = app.activeDocument;

var nomes = ["Teste1", "Teste2"];


for(var mm = 0; mm < nomes.length; mm++){
	nome = nomes[mm];
	
	var newDoc = app.activeDocument.duplicate();

	// Remove all empty layers.
	for (i = newDoc.layers.length-1; i >=0; i--)
	{
    	if (!newDoc.layers[i].visible)
    	{
        	newDoc.layers[i].remove()
    	}
	}

	var textLayer = getTextLayer(newDoc);

	textLayer.textItem.contents = nome;

	newDoc.mergeVisibleLayers();

	pngOptions = new PNGSaveOptions();
	pngOptions.compression = 0;
	pngOptions.interlaced = false;

	var savePath = File(oriDoc.path + "/" + oriDoc.name.replace('.psd', '') + "_" + nome + ".png");

	newDoc.saveAs(savePath, pngOptions, true, Extension.LOWERCASE)

	// Close the duplicate.
	newDoc.close(SaveOptions.DONOTSAVECHANGES);

}