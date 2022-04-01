function Validator(options) {
    // Lấy element của form
    var formElement = document.querySelector(options.form);
    // Thực hiện validate
    function validate(inputElement, rule, errorElement) {
        var errorMessage = rule.test(inputElement.value);
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');

        }
    }
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = inputElement.parentElement.parentElement.querySelector('.form-message');
            if (inputElement) {
                // Trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule, errorElement)
                }
                // Trường hợp tiếp tục nhập vào input
                inputElement.oninput = function () {
                    errorElement.innerText = '';
                }
            }
        })
    }
}
// Rules
// 1. Khi có lỗi => trả ra message lỗi.
// 2. Khi không có lỗi => không trả ra gì.
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này!!!';
        }
    };
}
Validator.isPassword = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.length > 6 ?
                undefined
                :
                'Mật khẩu phải dài hơn 6 ký tự!!!'
        }
    };
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            // var regex = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/');
            var regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng email!!!';
        }
    };
}