$ ->
  app.initialize()

window.app =
  initialize: ->
    @setBind()

    @my_number = 0
    @dealer_number = 0
    @my_burst = 0
    @dealer_burst = 0

    #スペード=1 クローバー=2 ハート=3 ダイヤ=4
    @trump_number = new Array
    for i in [1..4]
      @trump_number[i] = [1..13]
    #1~10はそのままの値
    for i in [1..4]
      for j in [1..13]
        @trump_number[i][j] = j
        #10~13の数はブラックジャックでは10と扱う
        if j >= 10
          @trump_number[i][j] = 10

    #確認用
    @check_trump_number = new Array
    for i in [1..4]
      @check_trump_number[i] = [1..13]
    #未使用のカードは0 使用したら1
    for i in [1..4]
      for j in [1..13]
        @check_trump_number[i][j] = 0

  setBind: ->
    $('#duel_start').on 'click', =>
      @dealCard()
    $('#hit').on 'click', =>
      @addMyCard 'my'
    $('#stay').on 'click', =>
      @battle @dealer_number, @my_number

  dealCard: ->
    @decideDealerNumber()
    @decideMyNumber()

  #ディーラーの初手のカードを決める
  decideDealerNumber: ->
    dealer_mark1 = _.random 1, 4
    dealer_number1 = _.random 1, 13
    #使用されていたらやり直し
    while @check_trump_number[dealer_mark1][dealer_number1] is 1
      dealer_mark1 = _.random 1, 4
      dealer_number1 = _.random 1, 13
    @check_trump_number[dealer_mark1][dealer_number1] = 1

    dealer_mark2 = _.random 1, 4
    dealer_number2 = _.random 1, 13
    while @check_trump_number[dealer_mark2][dealer_number2] is 1
      dealer_mark2 = _.random 1, 4
      dealer_number2 = _.random 1, 13
    @check_trump_number[dealer_mark2][dealer_number2] = 1

    @dealer_number = @trump_number[dealer_mark1][dealer_number1] + @trump_number[dealer_mark2][dealer_number2]
    console.log @dealer_number
    while @dealer_number < 16
      @addDealerCard()

  #自分の初手のカードを決める
  decideMyNumber: ->
    my_mark1 = _.random 1, 4
    my_number1 = _.random 1, 13
    #使用されていたらやり直し
    while @check_trump_number[my_mark1][my_number1] is 1
      my_mark1 = _.random 1, 4
      my_number1 = _.random 1, 13
    @check_trump_number[my_mark1][my_number1] = 1

    my_mark2 = _.random 1, 4
    my_number2 = _.random 1, 13
    while @check_trump_number[my_mark2][my_number2] is 1
      my_mark2 = _.random 1, 4
      my_number2 = _.random 1, 13
    @check_trump_number[my_mark2][my_number2] = 1

    @my_number = @trump_number[my_mark1][my_number1] + @trump_number[my_mark2][my_number2]
    console.log @my_number

  #自分がカードをもう一枚引いたときの動作
  addMyCard: ->
    additional_mark = _.random 1, 4
    additional_number = _.random 1, 13
    while @check_trump_number[additional_mark][additional_number] is 1
      additional_mark = _.random 1, 4
      additional_number = _.random 1, 13
    @check_trump_number[additional_mark][additional_number] = 1
    @my_number = @my_number + @trump_number[additional_mark][additional_number]
    if @my_number > 21
      @my_burst = 1
    console.log @my_number

  addDealerCard: ->
    additional_mark = _.random 1, 4
    additional_number = _.random 1, 13
    while @check_trump_number[additional_mark][additional_number] is 1
      additional_mark = _.random 1, 4
      additional_number = _.random 1, 13
    @check_trump_number[additional_mark][additional_number] = 1
    @dealer_number = @dealer_number + @trump_number[additional_mark][additional_number]
    console.log @dealer_number
    if @dealer_number > 21
      @dealer_burst = 1

  battle: (dealer_number, mynumber)->
    if @dealer_burst is 1 and @my_burst is 1
      console.log 'あなたの負けです！'
    else if @dealer_burst is 1
      console.log 'あなたの勝ちです！'
    else if @my_burst is 1
      console.log 'あなたの負けです！'
    else if @dealer_number is @my_number
      console.log '引き分けです。'
    else if @dealer_number > @my_number
      console.log 'あなたの負けです！'
    else
      console.log 'あなたの勝ちです！'


