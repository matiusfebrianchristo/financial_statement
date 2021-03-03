 axios
                .get("administration/administrationdataperyear/")
                .then((res) => {
                  const obj = res.data[new Date().getFullYear()];
                  const hasil = Object.keys(obj).map((key) => [
                    Number(key),
                    obj[key],
                  ]);
                  let bulan;
                  this.dataMonth = hasil.length;
                  const income = [];
                  const outcome = [];
                  const profit = [];
                  const fullDataChart = [];
                  for (let i = 0; i < hasil.length; i++) {
                    bulan = hasil[i][0];

                    income.push(hasil[i][1].income);
                    outcome.push(hasil[i][1].outcome);
                    profit.push(hasil[i][1].profit);
                    fullDataChart.push({
                      income: income[i],
                      outcome: outcome[i],
                      profit: profit[i],
                      month: (hasil[i][1].month = moment()
                        .locale("id")
                        .month(bulan - 1)
                        .format("MMMM")),
                    });
                  }
                  console.log(fullDataChart);
                  // console.log(
                  //   this.filterByValue(this.fullDataChart, "January", "pemasukan", 2000)
                  // );
                })
                .catch((err) => console.log(err));