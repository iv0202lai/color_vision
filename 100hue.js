const container = document.getElementById('container');

// Data for groups and colors
const groupData = [
    { fixed: 85, range: Array.from({ length: 21 }, (_, i) => i + 1) },
    { fixed: 22, range: Array.from({ length: 21 }, (_, i) => i + 22) },
    { fixed: 43, range: Array.from({ length: 21 }, (_, i) => i + 43) },
    { fixed: 64, range: Array.from({ length: 21 }, (_, i) => i + 64) }
];

const colors = {
    1: 'rgb(170, 116, 105)',
    2: 'rgb(170, 115, 101)',
    3: 'rgb(167, 113, 97)',
    4: 'rgb(165, 114, 96)',
    5: 'rgb(164, 114, 92)',
    6: 'rgb(164, 114, 88)',
    7: 'rgb(163, 115, 86)',
    8: 'rgb(162, 117, 84)',
    9: 'rgb(163, 119, 82)',
    10: 'rgb(163, 121, 81)',
    11: 'rgb(164, 123, 78)',
    12: 'rgb(162, 123, 73)',
    13: 'rgb(161, 125, 72)',
    14: 'rgb(162, 129, 73)',
    15: 'rgb(159, 132, 74)',
    16: 'rgb(154, 131, 71)',
    17: 'rgb(156, 138, 76)',
    18: 'rgb(154, 138, 76)',
    19: 'rgb(149, 137, 76)',
    20: 'rgb(143, 140, 74)',
    21: 'rgb(142, 143, 87)',
    22: 'rgb(139, 144, 88)',
    23: 'rgb(136, 145, 92)',
    24: 'rgb(133, 147, 96)',
    25: 'rgb(128, 146, 98)',
    26: 'rgb(126, 149, 102)',
    27: 'rgb(126, 149, 104)',
    28: 'rgb(120, 150, 106)',
    29: 'rgb(117, 150, 108)',
    30: 'rgb(113, 152, 109)',
    31: 'rgb(106, 152, 113)',
    32: 'rgb(105, 153, 115)',
    33: 'rgb(105, 154, 119)',
    34: 'rgb(96, 152, 119)',
    35: 'rgb(90, 148, 122)',
    36: 'rgb(91, 150, 126)',
    37: 'rgb(88, 150, 129)',
    38: 'rgb(89, 151, 132)',
    39: 'rgb(85, 150, 133)',
    40: 'rgb(84, 153, 136)',
    41: 'rgb(84, 151, 137)',
    42: 'rgb(82, 150, 140)',
    43: 'rgb(80, 151, 143)',
    44: 'rgb(73, 152, 146)',
    45: 'rgb(69, 153, 149)',
    46: 'rgb(75, 153, 151)',
    47: 'rgb(75, 152, 152)',
    48: 'rgb(80, 153, 157)',
    49: 'rgb(85, 151, 160)',
    50: 'rgb(84, 150, 162)',
    51: 'rgb(89, 150, 163)',
    52: 'rgb(95, 149, 165)',
    53: 'rgb(102, 149, 164)',
    54: 'rgb(103, 146, 165)',
    55: 'rgb(108, 146, 169)',
    56: 'rgb(107, 141, 166)',
    57: 'rgb(114, 144, 170)',
    58: 'rgb(114, 141, 169)',
    59: 'rgb(118, 141, 170)',
    60: 'rgb(120, 138, 168)',
    61: 'rgb(121, 133, 162)',
    62: 'rgb(128, 136, 165)',
    63: 'rgb(132, 137, 166)',
    64: 'rgb(136, 136, 166)',
    65: 'rgb(138, 136, 164)',
    66: 'rgb(143, 136, 164)',
    67: 'rgb(146, 135, 163)',
    68: 'rgb(147, 134, 160)',
    69: 'rgb(152, 133, 159)',
    70: 'rgb(152, 132, 156)',
    71: 'rgb(155, 129, 152)',
    72: 'rgb(160, 130, 152)',
    73: 'rgb(157, 124, 145)',
    74: 'rgb(163, 126, 146)',
    75: 'rgb(167, 126, 144)',
    76: 'rgb(167, 123, 140)',
    77: 'rgb(168, 121, 136)',
    78: 'rgb(170, 119, 132)',
    79: 'rgb(172, 121, 130)',
    80: 'rgb(172, 117, 126)',
    81: 'rgb(171, 117, 122)',
    82: 'rgb(169, 115, 117)',
    83: 'rgb(173, 119, 118)',
    84: 'rgb(172, 118, 114)',
    85: 'rgb(171, 117, 109)'
};

let groups = [];

function initializeBlocks() {
    container.innerHTML = ''; // Clear the container to start fresh

    // Reinitialize groups
    groups = groupData.map((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');

        // Create the fixed left block
        const leftFixedBlock = createBlock(group.fixed, true, true);
        groupDiv.appendChild(leftFixedBlock);

        // Create movable blocks in the original order
        const movableBlocks = group.range.map(num => createBlock(num));

        // Add extra movable block with `85` in the first row
        if (index === 0) {
            movableBlocks.unshift(createBlock(group.fixed));
        }

        movableBlocks.forEach(block => groupDiv.appendChild(block));

        // Create the fixed right block
        const rightFixedBlock = createBlock(group.range[group.range.length - 1] + 1, true, true);
        groupDiv.appendChild(rightFixedBlock);

        // Append the group to the container
        container.appendChild(groupDiv);

        // Return the updated group data
        return { fixed: group.fixed, blocks: [leftFixedBlock, ...movableBlocks, rightFixedBlock] };
    });

    bindEvents(); // Rebind events to the new blocks
}

function createBlock(number, isFixed = false, hideNumber = false, color = null) {
    const block = document.createElement('div');
    block.classList.add('block');
    if (isFixed) block.classList.add('fixed');
    block.style.backgroundColor = color || colors[number];
    block.textContent = hideNumber ? '' : number;
    block.dataset.number = number;
    return block;
}


function bindEvents() {
    document.querySelectorAll('.block:not(.fixed)').forEach(block => {
        block.addEventListener('mousedown', startDrag);
        block.addEventListener('touchstart', startDrag);
    });
    container.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);
    container.addEventListener('touchmove', moveDrag);
    document.addEventListener('touchend', endDrag);
}

let draggedBlock = null;

function startDrag(e) {
    const target = e.target.closest('.block');
    if (!target || target.classList.contains('fixed')) return;

    draggedBlock = target;
    draggedBlock.classList.add('dragging');
}

function moveDrag(e) {
    if (!draggedBlock) return;

    const touch = e.touches ? e.touches[0] : e;
    const elementUnderPointer = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetBlock = elementUnderPointer?.closest('.block:not(.fixed)');

    if (targetBlock && targetBlock !== draggedBlock) {
        const parent = targetBlock.parentNode;
        const draggedIndex = Array.from(parent.children).indexOf(draggedBlock);
        const targetIndex = Array.from(parent.children).indexOf(targetBlock);

        parent.removeChild(draggedBlock);
        if (draggedIndex < targetIndex) {
            parent.insertBefore(draggedBlock, targetBlock.nextSibling);
        } else {
            parent.insertBefore(draggedBlock, targetBlock);
        }
    }
}

function endDrag() {
    if (draggedBlock) {
        draggedBlock.classList.remove('dragging');
        draggedBlock = null;
    }
}

function randomizeOrder() {
    groups.forEach(group => {
        const groupDiv = group.blocks[0].parentNode; // Parent container for the group
        const fixedLeftBlock = group.blocks[0]; // First block (fixed)
        const fixedRightBlock = group.blocks[group.blocks.length - 1]; // Last block (fixed)

        // Extract movable blocks
        const movableBlocks = group.blocks.slice(1, -1); // Exclude fixed blocks

        // Shuffle movable blocks
        for (let i = movableBlocks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [movableBlocks[i], movableBlocks[j]] = [movableBlocks[j], movableBlocks[i]];
        }

        // Clear the group container
        groupDiv.innerHTML = '';

        // Rebuild the group container with the original structure
        groupDiv.appendChild(fixedLeftBlock);
        movableBlocks.forEach(block => groupDiv.appendChild(block));
        groupDiv.appendChild(fixedRightBlock);

        // Update the group's block order
        group.blocks = [fixedLeftBlock, ...movableBlocks, fixedRightBlock];
    });

    bindEvents(); // Rebind events to ensure drag-and-drop still works
}


function submitOrder() {
    // Retrieve the current order for each group directly from the DOM
    const result = Array.from(container.querySelectorAll('.group')).map(groupDiv => {
        // Get all blocks in the group, excluding fixed and alignment blocks
        return Array.from(groupDiv.querySelectorAll('.block:not(.fixed)'))
            .map(block => block.dataset.number); // Extract the dataset number of movable blocks
    }).flat(); // Flatten the array of arrays into a single array

    // Display the current order in the output
    document.getElementById('output').textContent = `Order Result: ${result.join(', ')}`;

    // Prepare the R code
    const rCode = `
library(CVD)
values <- c(${result.join(', ')})
Color.Vision.VingrysAndKingSmith(values, 'FM1OO-Hue', silent=FALSE)
scoreFM100Graphic(userFM100values = values)
    `.trim();

    // Encode the R code and set it as the iframe's source
    const encodedCode = encodeURIComponent(rCode);
    document.getElementById('rdrrIframe').src = `https://rdrr.io/snippets/embed/?code=${encodedCode}`;
}

let numbersHidden = false;
function resetOrder() {
    // Preserve the current visibility state of numbers
    const numbersHidden = Array.from(container.querySelectorAll('.block:not(.fixed)'))
        .every(block => block.textContent === '');

    container.innerHTML = ''; // Clear the container

    // Reinitialize groups
    groups = groupData.map((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');

        // Create the fixed left block
        const leftFixedBlock = createBlock(group.fixed, true, true);
        groupDiv.appendChild(leftFixedBlock);

        // Create movable blocks in the original order
        const movableBlocks = group.range.map(num => createBlock(num));

        // Add extra movable block for the first row
        if (index === 0) {
            movableBlocks.unshift(createBlock(group.fixed));
        }

        movableBlocks.forEach(block => groupDiv.appendChild(block));

        // Create the fixed right block
        const rightFixedBlock = createBlock(group.range[group.range.length - 1] + 1, true, true);
        groupDiv.appendChild(rightFixedBlock);

        container.appendChild(groupDiv);

        return { fixed: group.fixed, blocks: [leftFixedBlock, ...movableBlocks, rightFixedBlock] };
    });

    bindEvents(); // Rebind drag-and-drop events

    // Restore the number visibility state
    toggleNumbers(!numbersHidden); // Restore to the correct visibility state

    document.getElementById('output').textContent = "Order Result:";
}


function toggleNumbers(forceHidden = null) {
    // Determine if numbers should be hidden or shown
    const numbersHidden = forceHidden !== null 
        ? forceHidden 
        : Array.from(container.querySelectorAll('.block:not(.fixed)'))
            .every(block => block.textContent === '');

    // Toggle the visibility of numbers for movable blocks
    Array.from(container.querySelectorAll('.block:not(.fixed)')).forEach(block => {
        block.textContent = numbersHidden ? block.dataset.number : '';
    });

    // Update the button text
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.textContent = numbersHidden ? 'Hide Numbers' : 'Show Numbers';
}

initializeBlocks();
