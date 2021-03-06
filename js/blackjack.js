// Generated by CoffeeScript 1.12.3
(function() {
  $(function() {
    return app.initialize();
  });

  window.app = {
    number: {
      'my': 0,
      'dealer': 0
    },
    initialize: function() {
      var i, j, k, l, m, n, o, p;
      this.setBind();
      this.add_mynumber = 3;
      this.add_dealernumber = 3;
      this.my_burst = 0;
      this.dealer_burst = 0;
      this.trump_number = new Array;
      for (i = k = 1; k <= 4; i = ++k) {
        this.trump_number[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      }
      for (i = l = 1; l <= 4; i = ++l) {
        for (j = m = 1; m <= 13; j = ++m) {
          this.trump_number[i][j] = j;
          if (j === 1) {
            this.trump_number[i][j] = 11;
          }
          if (j >= 10) {
            this.trump_number[i][j] = 10;
          }
        }
      }
      this.check_trump_number = new Array;
      for (i = n = 0; n <= 4; i = ++n) {
        this.check_trump_number[i] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      }
      for (i = o = 1; o <= 4; i = ++o) {
        for (j = p = 1; p <= 13; j = ++p) {
          this.check_trump_number[i][j] = 0;
        }
      }
      return this.check_trump_number[0][0] = 1;
    },
    setBind: function() {
      $('#duel_start').on('click', (function(_this) {
        return function() {
          return _this.duelStart();
        };
      })(this));
      $('#hit').on('click', (function(_this) {
        return function() {
          _this.addMyCard("my" + _this.add_mynumber);
          return _this.add_mynumber++;
        };
      })(this));
      $('#stay').on('click', (function(_this) {
        return function() {
          return _this.battle(_this.number['dealer'], _this.number['my']);
        };
      })(this));
      return $('#restart').on('click', (function(_this) {
        return function() {
          return _this.restart();
        };
      })(this));
    },
    duelStart: function() {
      $('#duel_start').fadeOut('normal');
      $('.center').fadeIn('normal');
      this.decideNumber('dealer1', 'dealer');
      console.log(this.number['dealer']);
      this.decideNumber('my1', 'my');
      this.decideNumber('my2', 'my');
      $('#dealer').text('?');
      return console.log(this.number['my']);
    },
    decideNumber: function(who, player) {
      var mark, number;
      mark = number = 0;
      while (this.check_trump_number[mark][number] === 1) {
        mark = _.random(1, 4);
        number = _.random(1, 13);
      }
      this.check_trump_number[mark][number] = 1;
      this.number["" + player] = this.number["" + player] + this.trump_number[mark][number];
      if (number === 1 && this.number["" + player] > 21) {
        this.number["" + player] = this.number["" + player] - 10;
      }
      $("#" + player).text(this.number["" + player]);
      return $("." + who).attr('src', "img/" + mark + "_" + number + ".png");
    },
    addMyCard: function(who) {
      this.decideNumber("my" + this.add_mynumber, 'my');
      $("." + who).show('normal');
      if (this.number['my'] > 21) {
        this.my_burst = 1;
        $("#hit").prop("disabled", true);
        $('.burst1').fadeIn('fast');
      }
      this.drawed();
      return console.log(this.number['my']);
    },
    addDealerCard: function() {
      this.decideNumber("dealer" + this.add_dealernumber, 'dealer');
      $(".dealer" + this.add_dealernumber).show('normal');
      if (this.number['dealer'] > 21) {
        this.dealer_burst = 1;
        $('.burst2').fadeIn('fast');
      }
      this.add_dealernumber++;
      this.drawed();
      return console.log(this.number['dealer']);
    },
    drawed: function() {
      return $('.deck').fadeOut('fast', (function(_this) {
        return function() {
          return $('.deck').fadeIn('fast');
        };
      })(this));
    },
    battle: function(dealernumber, mynumber) {
      this.decideNumber('dealer2', 'dealer');
      $('.burst1').fadeOut('fast');
      while (this.number['dealer'] < 17) {
        if (this.my_burst === 1) {
          break;
        }
        this.addDealerCard();
      }
      $("#dealer").text(this.number['dealer']);
      this.judge();
      $('#hit').prop("disabled", true);
      return $('#stay').prop("disabled", true);
    },
    judge: function() {
      $('#restart').show('slow');
      if (this.dealer_burst === 1 && this.my_burst === 1) {
        console.log('あなたの負けです！');
        return $('#lose').fadeIn('fast');
      } else if (this.dealer_burst === 1) {
        console.log('あなたの勝ちです！');
        return $('#win').fadeIn('fast');
      } else if (this.my_burst === 1) {
        console.log('あなたの負けです！');
        return $('#lose').fadeIn('fast');
      } else if (this.number['dealer'] === this.number['my']) {
        console.log('引き分けです。');
        return $('#draw').fadeIn('fast');
      } else if (this.number['dealer'] > this.number['my']) {
        console.log('あなたの負けです！');
        return $('#lose').fadeIn('fast');
      } else {
        console.log('あなたの勝ちです！');
        return $('#win').fadeIn('fast');
      }
    },
    restart: function() {
      var i, j, k, l, m;
      for (i = k = 1; k <= 4; i = ++k) {
        for (j = l = 1; l <= 13; j = ++l) {
          this.check_trump_number[i][j] = 0;
        }
      }
      $('#restart').hide('normal');
      $('#win').fadeOut('normal');
      $('#lose').fadeOut('normal');
      $('#draw').fadeOut('normal');
      $('.burst2').fadeOut('normal');
      this.number['dealer'] = 0;
      this.number['my'] = 0;
      this.add_mynumber = 3;
      this.add_dealernumber = 3;
      this.my_burst = 0;
      this.dealer_burst = 0;
      for (i = m = 3; m <= 7; i = ++m) {
        $(".dealer" + i).hide('fast');
        $(".my" + i).hide('fast');
      }
      $('.dealer2').attr('src', 'img/z02.png');
      $("#hit").prop("disabled", false);
      $("#stay").prop("disabled", false);
      return this.duelStart();
    }
  };

}).call(this);
