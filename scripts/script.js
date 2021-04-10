(() => {

//page loader fadeOut jquery
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});

class BindGenerator{
    constructor(weaponsArrays, checkboxFragment) {
        this.weaponsArrays = weaponsArrays;
        this.checkboxFragment = checkboxFragment;
        this.itemsArray = [];
        this.shoppingCart = [];
        this.keyPressed = undefined;
        this.defaultText = ["Your bind will appear here.", "Shopping list:", 'Click to copy your bind.'];
    }

    createOption(object, fragment) {
        let container = document.createElement('div');
        let option = document.createElement('input');
        let optionLabel = document.createElement('label');
        let customCheckbox = document.createElement('span');
        customCheckbox.classList.add('checkbox-custom');
        option.setAttribute('type', 'checkbox');
        option.setAttribute('id', object.name);
        this.shoppingCart.indexOf(object) !== -1 ? option.checked = true : null; //renders checked inputs
        optionLabel.setAttribute('for', object.name);
        optionLabel.innerText = object.name.toUpperCase();
        optionLabel.appendChild(option);
        optionLabel.appendChild(customCheckbox);
        container.appendChild(optionLabel);
        fragment.prepend(container);
    }

    renderOptions(object, checkboxList, fragment) {
        for(let i = 0; i < object.length; i++) {
            this.createOption(object[i], fragment);
        }
        checkboxList.prepend(fragment);
    }

    chooseType (name) {
        switch(name) {
            case 'Pistols':
                this.renderOptions(weaponsArrays[weaponsArrays.indexOf(pistolsArray)], checkboxList, checkboxFragment);
                this.itemsArray = weaponsArrays[weaponsArrays.indexOf(pistolsArray)];
                break;
            case 'Heavy':
                this.renderOptions(weaponsArrays[weaponsArrays.indexOf(heavyArray)], checkboxList, checkboxFragment);
                this.itemsArray = weaponsArrays[weaponsArrays.indexOf(heavyArray)];
                break;
            case 'SMGs':
                this.renderOptions(weaponsArrays[weaponsArrays.indexOf(smgsArray)], checkboxList, checkboxFragment);
                this.itemsArray = weaponsArrays[weaponsArrays.indexOf(smgsArray)];
                break;
            case 'Rifles':
                this.renderOptions(weaponsArrays[weaponsArrays.indexOf(riflesArray)], checkboxList, checkboxFragment);
                this.itemsArray = weaponsArrays[weaponsArrays.indexOf(riflesArray)];
                break;
            case 'Equipment':
                this.renderOptions(weaponsArrays[weaponsArrays.indexOf(equipmentArray)], checkboxList, checkboxFragment);
                this.itemsArray = weaponsArrays[weaponsArrays.indexOf(equipmentArray)];
                break;
            case 'Grenades':
                this.renderOptions(weaponsArrays[weaponsArrays.indexOf(grenadesArray)], checkboxList, checkboxFragment);
                this.itemsArray = weaponsArrays[weaponsArrays.indexOf(grenadesArray)];
                break;
        }
    }

    displayItems(shoppingDisplay) {
        let df = document.createDocumentFragment();
        let ul = document.createElement('ul');
        let priceSum = 0;
        ul.classList.add('list');
        this.shoppingCart.forEach(item => {
            let li = document.createElement('li');
            li.innerText = item.name + " $" + item.price;
            ul.appendChild(li);
            priceSum += item.price;
        });
        let li = document.createElement('li');
        li.innerText = "total: "+ "$" + priceSum;
        li.style.fontWeight = "bold";
        li.style.marginTop = "10px";
        ul.appendChild(li);
        df.appendChild(ul);
        shoppingDisplay.innerHTML = this.defaultText[1];
        shoppingDisplay.appendChild(df);
    }

    renderOutput(output) {
        let itemString = '';
        this.shoppingCart.forEach(item => {
            itemString += "buy " + item.name + ";";
        })
        output.innerText = "bind " + " \""+ this.keyPressed +"\" \"" + itemString + "\";";
    }

    copyToClipboard(container) {
        if(document.body.createTextRange) {
            let range = document.body.createTextRange();
            range.moveToElementText(container);
            range.select();
            document.execCommand("Copy");
            alert("Copied your binds");
          }
        else if(window.getSelection) {
            // other browsers
            let selection = window.getSelection();
            let range = document.createRange();
            range.selectNodeContents(container);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("Copy");
            alert("Copied your binds.");
        }
    }
}

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

const riflesArray = [new Item('ak47', 2700), new Item('m4a4', 3100), new Item('m4a1', 2900), new Item('galilar', 1800), new Item('famas', 2050), new Item('sg556', 3000), new Item('aug', 3300), new Item('awp', 4750), new Item('ssg08', 1700), new Item('g3sg1', 5000), new Item('scar20', 5000)];
const pistolsArray = [new Item('glock', 200), new Item('usp_silencer', 200), new Item('hkp2000', 200), new Item('p250', 300), new Item('elite', 400), new Item('cz75a', 500), new Item('tec9', 500), new Item('fiveseven', 500), new Item('revolver', 600), new Item('deagle', 700)];
const heavyArray = [new Item('nova', 1050), new Item('sawedoff', 1100), new Item('mag7', 1300), new Item('xm1014', 2000), new Item('negev', 1700), new Item('m249', 5200)];
const smgsArray = [new Item('mac10', 1050), new Item('ump45', 1200), new Item('mp9', 1250), new Item('bizon', 1400), new Item('mp5sd', 1500), new Item('mp7', 1500), new Item('p90', 2350)];
const grenadesArray = [new Item('decoy', 50), new Item('flashbang', 200), new Item('smokegrenade', 300), new Item('hegrenade', 300), new Item('molotov', 400), new Item('incgrenade', 600)];
const equipmentArray = [new Item('vest', 650), new Item('vesthelm', 1000), new Item('defuser', 400), new Item('taser', 200)];
const weaponsArrays = [pistolsArray, riflesArray, heavyArray, smgsArray, grenadesArray, equipmentArray];

weaponsArrays.forEach(array => {
    array.sort((a, b) => {
        if (a.name < b.name)
            return 1;
        if (a.name > b.name)
            return -1;
        return 0;
    })
})

const checkboxFragment = document.createDocumentFragment();

let csgoBinds = new BindGenerator(weaponsArrays, checkboxFragment);

const shoppingCartDisplay = document.querySelector('.shopping-cart');
const verticalBox = document.querySelector('.vertical-box');
const horizontalBox = document.querySelector('.horizontal-box');
const checkboxList = document.querySelector('.checkbox-list');
const listButtons = document.querySelectorAll('.list-button');
const doneButton = document.querySelector('.done-button');
const chooseKeyButton = document.querySelector('.key');
const output = document.querySelector('.output');
const clearButton = document.querySelector('.clear-all');

listButtons.forEach(button => {
    button.addEventListener('click', () => {
        csgoBinds.chooseType(button.innerText);
        verticalBox.parentNode.classList.remove('hidden');
        verticalBox.parentNode.classList.add('visible');
    });
});

//cancels horizontal and vertical menus
document.querySelector('.container').onclick = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('checkbox-container')) {
        verticalBox.parentNode.classList.remove('visible');
        setTimeout(() => {verticalBox.parentNode.classList.add('hidden')}, 200);
        setTimeout(() => {checkboxList.innerHTML = ''}, 200);
    }
    if (e.target.classList.contains('horizontal-box')) {
        chooseKeyButton.disabled = false;
        horizontalBox.classList.remove('visible');
        setTimeout(() => {horizontalBox.classList.add('hidden')}, 200);
    }
}

doneButton.addEventListener('click', () => {
    verticalBox.parentNode.classList.remove('visible');
    setTimeout(() => {verticalBox.parentNode.classList.add('hidden')}, 200);

    checkboxList.childNodes.forEach(checkbox => {
        //adds checked items to shoppingList
        if(checkbox.querySelector('input').checked) {
            csgoBinds.itemsArray.forEach(item => {
                if(item.name === checkbox.querySelector('label').textContent.toLowerCase() && csgoBinds.shoppingCart.indexOf(item) === -1)
                    csgoBinds.shoppingCart.push(item);
            })
        }
        //removes items from shoppingList that have already been checked
        if(!checkbox.querySelector('input').checked) {
            csgoBinds.itemsArray.forEach(item => {
                if(item.name === checkbox.querySelector('label').textContent.toLowerCase() && csgoBinds.shoppingCart.indexOf(item) !== -1)
                    csgoBinds.shoppingCart.splice(csgoBinds.shoppingCart.indexOf(item), 1);
            })
        }
    })

    csgoBinds.itemsArray = [];
    setTimeout(() => {checkboxList.innerHTML = ''}, 200);
})

chooseKeyButton.addEventListener('click', () => {
    chooseKeyButton.disabled = true;
    if(csgoBinds.shoppingCart.length !== 0) {
        horizontalBox.classList.remove('hidden')
        horizontalBox.classList.add('visible');
        window.onkeypress = (e) => {
            chooseKeyButton.disabled = false;
            csgoBinds.keyPressed = e.key;
            horizontalBox.classList.remove('visible');
            setTimeout(() => {horizontalBox.classList.add('hidden')}, 200);
            csgoBinds.renderOutput(output);
            csgoBinds.displayItems(shoppingCartDisplay);
            shoppingCartDisplay.classList.add('appear');
            csgoBinds.shoppingCart = [];
            output.setAttribute('title', csgoBinds.defaultText[2])
            window.onkeypress = null;
        }
    } else alert('Choose items first!');
})

clearButton.addEventListener('click', () => {
    csgoBinds.shoppingCart = [];
    output.innerText = csgoBinds.defaultText[0];
    output.removeAttribute('title');
    if(document.querySelector('.list'))
        setTimeout(() => {document.querySelector('.list').remove()}, 300);
    if(shoppingCartDisplay.classList.contains('appear'))
        shoppingCartDisplay.classList.remove('appear');
})

output.onclick = () => {
    if(output.innerText !== csgoBinds.defaultText[0])
        csgoBinds.copyToClipboard(output);
}

})();