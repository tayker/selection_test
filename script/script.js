document.addEventListener('DOMContentLoaded', function(){
    
    flatpickr("[type='date']", {
        maxDate: 'today'
    });
    
    var form = {
        form: null,
        textFields: null,
        email: null,
        popUp: null,
        overlay: null,
        message: null,
        init: function(){
            this.textFields = document.querySelectorAll('[type="text"], [type="password"]');
            this.message = document.querySelector('[name="message"]');
            this.form = document.getElementById('form');
            this.email = document.getElementById('email');
            this.popUp = document.getElementById('popUp');
            this.overlay =document.getElementById('overlay');
            
            this.form.addEventListener('submit', form.submit);
            form.changeHandler();
        },
        validation: function(){
            if(form.validateEmail(this.email.value) === false){
                this.email.classList.add('error');
                this.email.nextElementSibling.innerHTML = 'Invalid Email';
            }
            if(form.validateTextfields() === true && form.validateEmail(this.email.value) === true){
                form.validationPassed();
            }
        },
        validateEmail: function(email){
            var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            return emailRegEx.test(String(email).toLowerCase());
        },
        validateTextfields: function(){
            var textFieldSpace = /['"]+/g;
            var validated = true;
            
            for(i=0;i<this.textFields.length;i++){
                if(textFieldSpace.test(String(this.textFields[i].value).toLowerCase()) === true){
                    this.textFields[i].classList.add('error');
                    this.textFields[i].nextElementSibling.innerHTML = 'Invalid text';
                    validated = false;
                }
                if(this.textFields[i].value == ''){
                    this.textFields[i].classList.add('error');
                    this.textFields[i].nextElementSibling.innerHTML = 'Empty field';
                    validated = false;
                }
            }
            if(textFieldSpace.test(String(this.message.value).toLowerCase()) === true){
                this.message.classList.add('error');
                this.message.nextElementSibling.innerHTML = 'herrror';
                validated = false;
            }
            return validated;
        },
        submit: function(e){
            e.preventDefault();
            form.validation();
        },
        validationPassed: function(){
            this.overlay.style.display = 'block';
            this.popUp.style.display = 'block';
            
            this.overlay.addEventListener('click', () =>{
                this.overlay.style.display = 'none';
                this.popUp.style.display = 'none';
            });
        },
        changeHandler: function(){
            for(i=0; i<this.textFields.length; i++){
                this.textFields[i].addEventListener('input', function(){
                    this.classList.remove('error');
                    this.nextElementSibling.innerHTML = '';
                });
            }
            this.message.addEventListener('input', ()=>{
                this.message.classList.remove('error');
                this.message.nextElementSibling.innerHTML = '';
            });
        }
    }
    form.init();
});