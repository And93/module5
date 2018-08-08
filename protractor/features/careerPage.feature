Feature: Searching job
    This is simple test of search job in EPAM website

    Scenario: Search for a job with only the keyword field
        Given the career page is opened
        Then the search form should be visible

        When 'Test Automation Engineer' is introduced in the keyword field
        And the search button is clicked on
        Then there should be a job offer for 'Test Automation Engineer' position