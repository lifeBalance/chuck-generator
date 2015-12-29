$(document).ready(function () {
  var pageUrl = document.location.href;

  // When user clicks the generate button
  $('#generate').on('click', function () {
    getQuote(setQuote);
  });

  // When page loads for the first time
  getQuote(setQuote);

  function getQuote(setQuote) {
    $.ajax({
      url: 'http://api.icndb.com/jokes/random',
      type: 'GET',
      success: function(data) {
        var quote = data.value.joke;

        // Checking that the quote respects Tweet limits (140 characters)
        // Twitter shortens URLs of any length to 23 characters(24 counting the space),
        // so instead of `pageUrl.length`, I used `24`.
        if (quote.length + 24 >= 140) {
          getQuote(setQuote);
        } else {
          setQuote(quote, reCreateBtn);
        }
      }
    }); // End of AJAX
  }

  // Set the quote in the page.
  function setQuote(quoteText, reCreateBtn) {
    $('#quote').html(quoteText);
    reCreateBtn(quoteText, createBtn);
  }

  // Create a tweet button.
  function createBtn(quoteText) {
    twttr.widgets.createShareButton(
    pageUrl,
    document.getElementById('tweetIt'),
    {
      text: quoteText,
      size: 'large'
    }
    );
  }

  // Delete existing tweet button before creating a new one.
  function reCreateBtn(text, createBtn) {
    $('#tweetIt').empty(); // Destroy old button before creating a new one
    createBtn(text);
  }
});
