const FormValidator = (function () {
  const regex = {
    name: /^[a-zs]+$/i,
    phone: /(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/,
    url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  }

  const getFields = (selector) => {
    let fields = [];
    const fieldArr = Array.from(document.querySelectorAll(selector));
    
    fieldArr.forEach((field) => {
      fields.push(field);
    });

    return fields;
  };

  const validateOnBlur = (fieldSelector) => {
    const fields = getFields(fieldSelector);

    fields.forEach(field => {
      field.addEventListener('blur', () => {
        validateField(field);
      });
    });
  };

  const validateOnSubmit = (form, fieldSelector) => {
    const fields = getFields(fieldSelector);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // validation
      fields.forEach(field => {
        validateField(field);
      });

      // submit status
      const errorStatus = document.querySelector('.form-control--error');
      const submitStatus = document.querySelector('.submit-status');

      if (!errorStatus) {
        setSubmitStatus('success');
        resetForm(fields);
        setTimeout(clearSubmitStatus, 3000);
      } else {
        if (!submitStatus) {
          setSubmitStatus('error');
          setTimeout(clearSubmitStatus, 3000);
        }
      }
    });
  };

  const validateField = (field) => {
    if (field.value === '') {
      setFieldStatus(field, '', 'blank');
    } else {
      if (field.id === 'firstname') {
        if (regex.name.test(field.value)) {
          setFieldStatus(field, 'first name', 'success');
        } else {
          setFieldStatus(field, 'first name', 'invalid');
        }
      }

      if (field.id === 'lastname') {
        if (regex.name.test(field.value)) {
          setFieldStatus(field, 'last name', 'success');
        } else {
          setFieldStatus(field, 'last name', 'invalid');
        }
      }
  
      if (field.id === 'phone') {
        if (regex.phone.test(field.value)) {
          setFieldStatus(field, 'phone', 'success');
        } else {
          setFieldStatus(field, 'phone', 'invalid');;
        }
      }
  
      if (field.id === 'website') {
        if (regex.url.test(field.value)) {
          setFieldStatus(field, 'website', 'success');
        } else {
          setFieldStatus(field, 'website', 'invalid');
        }
      }
    }


  };

  const setFieldStatus = (field, fieldType, status) => {
    const inputGroup = field.parentElement;
    const fieldStatus = document.createElement('span');

    fieldStatus.className = 'field-status';

    if (status === 'success') {
      clearFieldStatus(field);

      fieldStatus.innerHTML = `
        <img src="assets/success.svg" class="field-status-icon" aria-hidden="true">
      `;
    }

    if (status === 'blank') {
      clearFieldStatus(field);
      
      fieldStatus.innerHTML = `
        <img src="assets/error.svg" class="field-status-icon" aria-hidden="true">
        <p class="field-status-message">Field cannot be blank</p>
      `;

      field.classList.add('form-control--error');
    }

    if (status === 'invalid') {
      clearFieldStatus(field);

      fieldStatus.innerHTML = `
        <img src="assets/error.svg" class="field-status-icon" aria-hidden="true">
        <p class="field-status-message">Invalid ${fieldType} format</p>
      `;

      field.classList.add('form-control--error');
    }

    inputGroup.appendChild(fieldStatus);
  }
  
  const clearFieldStatus = (field) => {
    if (field.nextElementSibling) {
      field.nextElementSibling.remove();
    }

    field.classList.remove('form-control--error');
  }

  const setSubmitStatus = (status) => {
    const form = document.querySelector('#contactForm');
    const submitStatus = document.createElement('div');

    submitStatus.className = 'submit-status';

    if (status === 'success') {
      submitStatus.innerHTML = `
        <img src="assets/success.svg" class="submit-status-icon" aria-hidden="true">
        <p class="submit-status-message">Form submitted</p>
      `;
    }

    if (status === 'error') {
      submitStatus.innerHTML = `
        <img src="assets/error.svg" class="submit-status-icon" aria-hidden="true">
        <p class="submit-status-message">Form not submitted</p>
      `;
    }
    
    form.appendChild(submitStatus);
  }

  const clearSubmitStatus = () => {
    const submitStatus = document.querySelector('.submit-status');

    submitStatus.remove();
  }

  const resetForm = (fields) => {
    fields.forEach(field => {
      clearFieldStatus(field);
      field.value = '';
    });
  }

  return {
    init(form, fieldSelector) {
      validateOnBlur(fieldSelector);
      validateOnSubmit(form, fieldSelector);
    },
  }
})();

const contactForm = document.querySelector('#contactForm');

FormValidator.init(contactForm, '.form-control');