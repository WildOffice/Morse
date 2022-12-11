class Morse {
    Table = {
        'A': '10111',
        'B': '111010101',
        'C': '11101011101',
        'D': '1110101',
        'E': '1',
        'F': '101011101',
        'G': '111011101',
        'H': '1010101',
        'I': '101',
        'J': '1011101110111',
        'K': '1110111',
        'L': '101110101',
        'M': '1110111',
        'N': '11101',
        'O': '11101110111',
        'P': '10111011101',
        'Q': '1110111010111',
        'R': '1011101',
        'S': '10101',
        'T': '111',
        'U': '1010111',
        'V': '101010111',
        'W': '101110111',
        'X': '11101010111',
        'Y': '1110101110111',
        'Z': '11101110101',
        '0': '1110111011101110111',
        '1': '1011101110111011',
        '2': '101011101110111',
        '3': '1010101110111',
        '4': '10101010111',
        '5': '101010101',
        '6': '11101010101',
        '7': '1110111010101',
        '8': '111011101110101',
        '9': '11101110111011100',
        '': '000',
        ' ': '0000000'
    };
    Sound = {
        Play: async function (message) {
            var array = message.split('');
            var beep = new Audio('/Morse/sounds/beep.flac');
            for (var i = 0; i < array.length; i++)
            {
                if (array[i] == '1')
                {
                    console.log('play');
                    beep.play();
                }
                else
                {
                    console.log('dont');
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    Encode = {
        Letter: (letter) => {
            return this.Table[letter.toUpperCase()] || null;
        },
        Word: (word) => {
            return word.split('').map(this.Encode.Letter).join('000');
        },
        Message: (message) => {
            return message.trim().split(' ').map(this.Encode.Word).join('0000000');
        }
    }
    Decode = {
        Letter: (letter) => {
            return Object.entries(this.Table).reduce((acc, curr) => { acc[curr[1]] = curr[0]; return acc; }, {})[letter] || null;
        },
        Word: (word) => {
            return word.split('000').map(this.Decode.Letter).join('');
        },
        Message: (message) => {
            return message.trim().split('0000000').map(this.Decode.Word).join(' ');
        }
    }
}
