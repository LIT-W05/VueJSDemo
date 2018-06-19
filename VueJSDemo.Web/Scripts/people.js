new Vue({
    el: '#app',
    mounted: function() {
        this.loadPeople();
    },
    data: {
        people: [],
        modalPerson: {
            FirstName: '',
            LastName: '',
            Age: ''
        },
        isEditMode: false,
        sortAsc: 1
    },
    methods: {
        loadPeople: function (cb) {
            $.get('/home/getall', people => {
                this.people = people;
                if (cb) {
                    cb();
                }
            });
        },

        newClick: function() {
            $(".modal").modal();
            this.isEditMode = false;
        },

        addClick: function() {
            $.post('/home/addperson', this.modalPerson, () => {
                this.loadPeople(() => {
                    $('.modal').modal('hide');
                    this.modalPerson = {
                        FirstName: '',
                        LastName: '',
                        Age: ''
                    }    
                });
            });
        },

        editClick: function (person) {
            this.isEditMode = true;
            this.modalPerson = Object.assign({}, person);// create a copy of an object in js
            $(".modal").modal();
        },

        updateClick: function() {
            $.post('/home/update', this.modalPerson, () => {
                this.loadPeople(() => {
                    $('.modal').modal('hide');
                    this.modalPerson = {
                        FirstName: '',
                        LastName: '',
                        Age: ''
                    }
                });
            });
        },

        deleteClick: function(id) {
            $.post('/home/delete', {id}, () => {
                this.loadPeople();
            });
        },

        sortClick: function() {
            this.people.sort((a, b) => (a.Age - b.Age) * this.sortAsc);
            this.sortAsc *= -1;
        }
    }
});