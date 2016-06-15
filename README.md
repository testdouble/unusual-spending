# Unusual Spending Kata

**For getting started with this kata, we recommend watching [this screencast
which walks through 
it](http://blog.testdouble.com/posts/2016-06-05-happier-tdd-with-testdouble-js.html).**

This is a repository designed to practice the [Unusual Spending Kata
](https://github.com/testdouble/contributing-tests/wiki/Unusual-Spending-Kata)
in Node.js with [testdouble.js](https://github.com/testdouble/testdouble.js) and
with [teenytest](https://github.com/testdouble/teenytest) in lieu of a more
full-featured test runner.

## Install

First, clone this repository. Then, run:

```
$ npm install
$ npm test
```

To ensure you're set up properly.

From there, you can add new tests in `test/lib/` and source listings in `lib/`.

## Feature Requirements

Pretend you work for a credit card company, and they're trying to add some
intelligence features as a value-add to retain their cardholders. Among these
features is an "unusual spending" notification that should be sent to cardholders
who spend more money than they usually do on a given category of spending from
one month to another.

The job of this module is to implement this feature by exporting a function that
takes a `userId` number and send an e-mail summarizing all of the categories for
which they spent greater than 150% of what they did in the month prior.

So far, it sounds pretty simple! But as you start breaking down the work in your
head, beads of sweat start rolling down. To implement this feature, you'll need:

1. To invoke the soon-to-be-implemented-by-your-coworkers `payment-api` module to
fetch this months and last month's payments for the given `userId` (for more
info, read the section on `payment-api` below)
2. (To suss out both this and the previous year/month to pass said `payment-api`)
3. To group each month's payments by category, summing them.
4. To determine the categories for which spending was unusually high
5. Compose an e-mail listing the categories of unusual spending & the amounts
6. Send the e-mail with the not-yet-implemented-by-some-other-team `email` module
(for more info, read the section on the `email` module below)

Your product owner says that the e-mail should look like this:

```
Hello valued card user #3921834!

We have detected unusually high spending on your card in these categories:

* You spent $148 on groceries (you spent $80 last month)
* You spent $928 on travel (you spent $0 last month)

Love,

The Credit Card Company
```

## The challenge

This kata's challenge is to practice decomposing problems into very small,
focused units using outside-in test-driven development. It is a contrived enough
example that most JavaScript developers could throw together a single function
that implements all the requirements in one go, but this exercise is intended
to provide a space to practice using test-driven development to guide the design
of our module from its entry point to arrive at small, well-named subordinate
functions from day 1.

## Third-party dependencies

This repo includes stubs of two third-party dependencies on which your code will
utlimately depend. The only problem? They're not implemented yet! When all is
said and done you'll be able to invoke them, but for now we'll have to fake them
in our tests.

### payment-api

The first thing our feature will want to do is fetch some payments for a user for
a given year and month. The included `payment-api` module will ultimately do this
for us, with an API like this:

``` javascript
var paymentApi = require('payment-api')

var payments = paymentApi(userId, year, month)
/* `payments` will be an array of objects shaped like:
 *  [{
 *    category: 'some category name',
 *    amount: 13.37
 *  }]
 */
```

Since the API isn't implemented yet, invoking the actual `payment-api` module
will throw an error, so instead we'll wrap it with a module we own and fake that
wrapper in our tests to drive out the behavior that we do control.

### email

The final step of our feature's requirement is to send an e-mail to the user.
Since e-mail is rather a fire-and-forget affair, the API we have at our disposal
looks like this:

``` javascript
var email = require('email')

email(userId, subject, body) // undefined
```

As I mentioned, invoking the email module itself will trigger an error, so in
this exercise we'll wrap our use of the method and replace the wrapper with a
test double in our tests.

## Hard Mode

For added difficulty, try augmenting the rules thusly:

* Try determining high spending with a rolling 3 months of past payments instead
of only looking at the prior month
* Instead of returning a list of payments synchronously (which would be quite
hard for any API to do in Node.js), change the contract of `payment-api`'s
exported function to accept a final callback function parameter. That callback
will be invoked with a method signature of `(error, payments)`. To stub an async
interaction you'll need to use `td.when().thenDo()`
