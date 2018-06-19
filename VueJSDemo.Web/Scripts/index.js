new Vue({
    el: '#app',
    data: {
        message: '',
        numbers: [1, 2],
        randomNumbers: [],
        min: '',
        max: ''
    },
    methods: {
        buttonClick: function () {
            this.message = this.message.split('').reverse().join('');
        },

        randomNumClick: function() {
            const num = Math.floor(Math.random() * 100);
            this.numbers.push(num);
        },

        sortClick: function() {
            this.numbers.sort((a, b) => a - b);
        },

        addRandomNumber: function () {
            const randBtwn = (min, max) =>  Math.floor(Math.random() * (max - min + 1) + min);
            this.randomNumbers.push(randBtwn(+this.min, +this.max));
        }
    }
});