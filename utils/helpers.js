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
  eq: function () {
    const args = Array.prototype.slice.call(arguments, 0, -1);
    return args.every(function (expression) {
      return args[0] === expression;
    });
  },
};

/*
This code will register a new helper eq that performs a strict equality check (===). 
If the two values are strictly equal, it will return true and 
the block inside the #if helper will be rendered. 
Otherwise, it will return false and the block will not be rendered.
*/