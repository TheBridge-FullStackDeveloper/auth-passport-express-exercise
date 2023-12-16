module.exports = {
  formatDate: function (date) {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );

    return formattedDate;
  },
  capitalize: function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },
};
