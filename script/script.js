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
     // Dark mode toggle
    $('#darkModeToggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        updateDarkModeStyles();
    });

    // Function to update dark mode styles
    function updateDarkModeStyles() {
        const darkModeEnabled = $('body').hasClass('dark-mode');
        $('#darkModeStyles').attr('href', `./style/${darkModeEnabled ? 'dark-mode' : 'style'}.css`);
    }
});
