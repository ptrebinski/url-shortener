const form = document.querySelector('#shortener-form');
const linkInput = document.querySelector('#link-input');
const errorMessageElement = document.querySelector('#error-message');
const linksList = document.querySelector('#links-list');
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

const createLinkElement = ({ originalLink, shortLink }) => {
  const link = document.createElement('li');
  link.className = 'shortener__link-container';

  link.innerHTML = `
      <span class="shortener__link shortener__link--long"
      >${originalLink}</span>
      
      <a href="${shortLink}" class="shortener__link shortener__link--short"
      >${shortLink}</a>
    `;

  return link;
};

const renderLink = (linkData) => {
  const linkElement = createLinkElement(linkData);
  linksList.appendChild(linkElement);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  hideError();
  const link = linkInput.value;

  try {
    const linkData = await shortenLink(link);
    const { full_short_link: shortLink, original_link: originalLink } = linkData;
    renderLink({ shortLink, originalLink });
  } catch (error) {
    showError(error.message);
  }
};

form.addEventListener('submit', handleSubmit);
