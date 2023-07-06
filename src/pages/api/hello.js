// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ data: {
    matches:[
      {id:1,resultado:"Win",date_time:1666544708, userId:"Nyne",mode:"Hard Point", map:"Al Bagra",points:5032, kills:"22", deaths: "21", sr:"+26",totalSR:"7550"},
      {id:2,resultado:"Win",date_time:1666544708, userId:"Nyne",mode:"Hard Point", map:"Al Bagra",points:5032, kills:"22", deaths: "21", sr:"+26",totalSR:"7550"},
      {id:3,resultado:"Win",date_time:1666544708, userId:"Nyne",mode:"Hard Point", map:"Al Bagra",points:5032, kills:"22", deaths: "21", sr:"+26",totalSR:"7550"},
    ]
  } })
}
