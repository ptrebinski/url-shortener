const form = document.querySelector('#shortener-form');
const linkInput = document.querySelector('#link-input');
const errorMessageElement = document.querySelector('#error-message');
const errorClassName = 'shortener__input--error';

const shortenLink = async (longLink) => {
  const url = `https://api.shrtco.de/v2/shorten?url=${longLink}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.ok) {
    if (data.error_code === 1) {
      throw new Error('Please, provide a valid url');
    } else if (data.error_code === 2) {
      throw new Error('Unable to shorten that link. It is not a valid url.');
    } else {
      throw new Error('Unknown error');
    }
  }

  return data.result;
};

const showError = (errorMessage) => {
  linkInput.classList.add(errorClassName);
  errorMessageElement.textContent = errorMessage;
};

const hideError = () => {
  linkInput.classList.remove(errorClassName);
  errorMessageElement.textContent = '';
};

const handleSubmit = async (e) => {
  e.preventDefault();
  hideError();
  const link = linkInput.value;

  try {
    const linkData = await shortenLink(link);
    prompt('Link generated!', linkData.short_link);
  } catch (error) {
    showError(error.message);
  }
};

form.addEventListener('submit', handleSubmit);
