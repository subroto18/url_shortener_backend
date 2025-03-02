const validateURL = (url) => {
  const regex = /^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/\S*)?$/;
  return regex.test(url);
};

module.exports = validateURL;
