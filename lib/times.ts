// from http://stackoverflow.com/a/30452949 (ruby-style "3.times do" iterators)
// repeat :: forall a. Int -> (a -> a) -> a -> a
const repeat = n => f => x => {
  while (true) {
    if (n === 0)
      return x
    else
      (n = n - 1, x = f (x))
  }
}

// times :: Int -> (Int -> Int) -> Int
const times = n => f =>
  repeat (n) (i => (f(i), i + 1)) (0)

export = times;
