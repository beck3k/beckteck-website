const properties = {
    "layers": {
        "mucosa": {
            "name": "Mucosa",
            "elements": {
                "lumen": {
                    "id": "lumen",
                    "name": "Lumen"
                },
                "epithelium": {
                    "id": "Epithelium",
                    "name": "Epithelium",
                    "text": "Simple columnar epithelium which secretes mucus, protecting digestive organs for the enzymes within their cavities."
                },
                "laminapropria": {
                    "id": "laminapropria",
                    "name": "Lamina Propria",
                    "text": "Connective tissue underneath the epithelium, with its capillaries nourishing the epithelium and absorbing nutrients.  The lymphoid follicles protect against bacteria and other pathogens, part of MALT."
                },
                "mucosae": {
                    "id": "mucosae",
                    "name": "Muscularis mucosae",
                    "text": "Smooth muscle to produce movements of mucosa enhanching secretion and absorption."
                }
            }
        },
        "submucosa": {
            "name": "Submucosa",
            "elements": {
                "submucosa": {
                    "id": "submucosa",
                    "text": "Connective tissue with blood and lymphatic vessels, lymphoid follicles, and nerve fibres of the surrouding tissues.  The elastic fibres provide shape retention, such as allowing the stomach to return after storing a large meal"
                }
            }
        },
        "muscularisexterna": {
            "name": "Muscularis Externa",
            "elements": {
                "circularlayer": {
                    "id": "circularlayer",
                    "name": "Circular Layer",
                    "text": "This layer is comprised of smooth muscle cells responsible for involuntary movement and segmentation.  Sphincters, thickened layers along the tract, function as valves controlling passage of food from one organ to another also preventing backflow, such as the bicuspid/tricuspid valves in the heart." 
                },
                "longitudinal": {
                    "id": "longitudinal",
                    "name": "Longitudinal Layer",
                    "text": "This layer is comprised of smooth muscle cells responsible for involuntary movement and segmentation.  Sphincters, thickened layers along the tract, function as valves controlling passage of food from one organ to another also preventing backflow, such as the bicuspid/tricuspid valves in the heart." 
                }
            }
        },
        "serosa": {
            "name": "Serosa",
            "elements": {
                "connectivetissue": {
                    "id": "connectivetissue",
                    "name": "Connective Tissue",
                    "text": "Areolar connective tissue coated in mesothelium.  In the esophagus, the sersoa is replaced by adventitia (a connective tissue binding the esophagus to its surrounding sturctures."
                },
                "epithelium": {
                    "id": "epithelium",
                    "name": "Mesothelium (epithelium)",
                    "text": "Areolar connective tissue coated in mesothelium.  In the esophagus, the sersoa is replaced by adventitia (a connective tissue binding the esophagus to its surrounding sturctures."
                }
            }
        }
    }
};

function writeInfo(layer, id) {
    var layerObj = properties.layers[layer];
    var element = layerObj.elements[id];

    $(".Layer").text(`Layer: ${layerObj.name}`);
    if(element.name){
        $(".Element").text(`Element: ${element.name}`);
    }
    if(element.text) {
        $(".Info").text(element.text);
    } else {
        $(".Info").text("");
    }
}

function handleHover(layer, id) {
    console.log(layer, id);
    var layerObj = properties.layers[layer];
    var elementObj = layerObj.elements[id];
    var name = "";
    if(elementObj.name){
        name = `-> ${elementObj.name}`;
    }
    $("#hovering").text(`Hovering: ${layerObj.name} ${name}`);
}

$(document).ready(() => {
    $("#svg-object").ready(() => {
        var svgRoot = $("#svg-object").contents();
        Object.keys(properties.layers).forEach(layer => {
            console.log(layer);
            Object.keys(properties.layers[layer].elements).forEach(element => {
                console.log(element);
                var target = properties.layers[layer].elements[element];
                console.log(target.id);
                svgRoot.find(`#${target.id}`).hover(() => handleHover(layer, element));
                svgRoot.find(`#${target.id}`).click(() => writeInfo(layer, element));
            });
       });
    });
});