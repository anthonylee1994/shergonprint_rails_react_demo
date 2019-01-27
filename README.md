## Task 1 (Rails + React Todo List App Demo)

### Setup
```bash
# Install Node.js + Rails + PostgreSQL
./start.sh
# Browse: http://localhost:3000
```

### References
- [ReactJS + Ruby on Rails API + Heroku App – Bruno Boehm – Medium](https://medium.com/@bruno_boehm/reactjs-ruby-on-rails-api-heroku-app-2645c93f0814)
- [Build a RESTful JSON API With Rails 5](https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one)

## Task 2
### Problems:
Please describe at least 2 ways to update multiple card_photos on a card, according to the following models:
- `Photo` has_many `:card_photos`
- `Card` has_many `:card_photos`
- `CardPhoto` belongs_to `:photo`, belongs_to `:card`

###Solutions
####Solution 1
1. Find `CardPhoto` items from selected `Card` and assign to `@card_photos`
2. For each `card_photo` in `@card_photos`, Call `card_photo.update` iteratively.

###Solution 2
1. Call `CardPhoto.where(card_id: <Card ID>)` to find the `CardPhoto`s which are belongs to the `Card` as `@found_card_photos`.
2. Call `@found_card_photos.update_all`.