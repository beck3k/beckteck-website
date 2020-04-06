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

var selected;

function getRGB(str){
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
      red: match[1],
      green: match[2],
      blue: match[3]
    } : {};
}

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

function clearColors(){
    $("#svg-object").ready(() => {
        var svgRoot = $("#svg-object").contents();
        Object.keys(properties.layers).forEach(layer => {
            Object.keys(properties.layers[layer].elements).forEach(element => {
                if(element != selected){
                    var target = properties.layers[layer].elements[element];
                    color = getRGB(target.color);
                    svgRoot.find(`#${target.id}`).css("fill", `rgb(${color.red}, ${color.green}, ${color.blue})`)
                } else {
                }
            });
       });
    });
}

function handleHover(layer, id, svgRoot) {
    var layerObj = properties.layers[layer];
    var elementObj = layerObj.elements[id];
    var name = "";
    if(elementObj.name){
        name = `-> ${elementObj.name}`;
    }
    selected = id;
    clearColors();
    var color = getRGB(elementObj.color);
    color.red = parseInt(color.red) + 50;
    color.green = parseInt(color.green) + 50;
    color.blue = parseInt(color.blue) + 50;
    svgRoot.find(`#${elementObj.id}`).css("fill", `rgb(${color.red}, ${color.green}, ${color.blue})`);
}

function mouseLeaveHandle(layer, id, svgRoot) {
//     var layerObj = properties.layers[layer];
//     var elementObj = layerObj.elements[id];
//     svgRoot.find(`#${elementObj.id}`).css(elementObj.color);
}

$(document).ready(() => {
    $("#svg-object").ready(() => {
        var svgRoot = $("#svg-object").contents();
        Object.keys(properties.layers).forEach(layer => {
            Object.keys(properties.layers[layer].elements).forEach(element => {
                var target = properties.layers[layer].elements[element];
                target.color = svgRoot.find(`#${target.id}`).css("fill");
                svgRoot.find(`#${target.id}`).hover(() => handleHover(layer, element, svgRoot));
                svgRoot.find(`#${target.id}`).click(() => writeInfo(layer, element));
                svgRoot.find(`#${target.id}`).mouseleave(() => mouseLeaveHandle(layer, element, svgRoot));
            });
       });
    });
});