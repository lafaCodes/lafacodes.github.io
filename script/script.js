$(document).ready(function() {
    $('#searchInput').on('input', function() {
        var searchKeyword = $(this).val().toLowerCase();

        $('.card-info p').each(function() {
            var words = $(this).text().split(/\s*,\s*|\s+/);

            $(this).empty();

            words.forEach(function(word, index) {
                var span = $('<span>').text(word);
                if (searchKeyword && word.toLowerCase().includes(searchKeyword)) {
                    span.addClass('highlight');
                }
                $(this).append(span);

                // Add comma between words if not the last word
                if (index < words.length - 1) {
                    $(this).append(', ');
                }
            }, this);
        });
    });
    //  // Dark mode toggle
    // const darkModeToggle = $('#darkModeToggle');
    // const body = $('body');

    // // Check the initial dark mode preference
    // const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    // // Set initial dark mode state
    // setDarkMode(isDarkMode);

    // // Toggle dark mode on switch change
    // darkModeToggle.on('change', function () {
    //   const newMode = body.hasClass('dark-mode') ? 'light' : 'dark';
    //   setDarkMode(newMode === 'dark');
    // });

    // // Function to set dark mode
    // function setDarkMode(isDark) {
    //   body.toggleClass('dark-mode', isDark);
    //   localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    // }
});
