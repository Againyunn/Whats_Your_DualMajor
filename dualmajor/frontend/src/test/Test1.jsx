import React, { useEffect, useState } from 'react';

export default function DataTest() {
    let counter = 0; // indexing counter
    const [state, setState] = useState(0);
    const [isIncrease, setIsIncrease] = useState(false);

    useEffect(() => {
        function tick() {
            return setTimeout(() => setState(state + 1), 1000);
        }
        return isIncrease ? tick() : ()=>{clearInterval(tick)}; 
    }, []);

    const pmsDatas = [
        {"idx":0 ,"data1":26.53,"data2":3800.00,"data3":3780.00,"data4":18.16,"data5":32.00,"data6":1157.01,"data7":106.68,"data8":99.00,"data9":18.83,"data10":49.00,"data11":29.47},
        {"idx":1 ,"data1":26.60,"data2":3800.00,"data3":3785.70,"data4":18.17,"data5":32.00,"data6":1210.24,"data7":1179.25,"data8":79.88,"data9":18.96,"data10":49.90,"data11":29.71},
        {"idx":2 ,"data1":27.30,"data2":3800.00,"data3":3741.00,"data4":17.24,"data5":32.00,"data6":1197.12,"data7":1196.55,"data8":80.67,"data9":18.52,"data10":49.11,"data11":30.37},
        {"idx":3 ,"data1":27.30,"data2":3800.00,"data3":3730.20,"data4":17.29,"data5":32.00,"data6":1194.24,"data7":1194.73,"data8":80.47,"data9":18.49,"data10":50.10,"data11":30.30},
        {"idx":4 ,"data1":27.30,"data2":3800.00,"data3":3728.90,"data4":17.42,"data5":32.00,"data6":1192.26,"data7":1198.10,"data8":80.57,"data9":18.52,"data10":49.50,"data11":30.27},
        {"idx":5 ,"data1":27.30,"data2":3800.00,"data3":3728.80,"data4":17.63,"data5":32.00,"data6":1195.23,"data7":1193.46,"data8":81.22,"data9":18.53,"data10":48.90,"data11":30.47},
        {"idx":6 ,"data1":27.30,"data2":3800.00,"data3":3766.60,"data4":17.72,"data5":32.00,"data6":1201.28,"data7":1220.99,"data8":81.35,"data9":18.53,"data10":48.20,"data11":30.40},
        {"idx":7 ,"data1":27.30,"data2":3800.00,"data3":3865.10,"data4":17.69,"data5":32.00,"data6":1233.98,"data7":1236.98,"data8":83.38,"data9":18.56,"data10":47.40,"data11":30.38},
        {"idx":8 ,"data1":27.30,"data2":3800.00,"data3":3894.00,"data4":17.67,"data5":32.00,"data6":1248.00,"data7":1227.65,"data8":83.83,"data9":18.59,"data10":47.13,"data11":30.39},
        {"idx":9 ,"data1":27.30,"data2":3800.00,"data3":3743.00,"data4":17.64,"data5":32.00,"data6":1197.76,"data7":1199.06,"data8":80.75,"data9":18.58,"data10":48.17,"data11":30.20},
        {"idx":10 ,"data1":27.30,"data2":3800.00,"data3":3731.00,"data4":17.58,"data5":32.00,"data6":1194.88,"data7":1192.42,"data8":80.44,"data9":18.54,"data10":49.75,"data11":30.50},
        {"idx":11 ,"data1":27.30,"data2":3800.00,"data3":3727.56,"data4":17.56,"data5":32.00,"data6":1192.43,"data7":1196.18,"data8":80.50,"data9":18.51,"data10":49.89,"data11":30.48},
        {"idx":12 ,"data1":27.30,"data2":3800.00,"data3":3717.14,"data4":17.52,"data5":32.00,"data6":1192.78,"data7":1188.14,"data8":80.43,"data9":18.52,"data10":49.29,"data11":30.37},
        {"idx":13 ,"data1":27.30,"data2":3800.00,"data3":3780.29,"data4":17.48,"data5":32.00,"data6":1203.02,"data7":1223.54,"data8":81.14,"data9":18.51,"data10":48.00,"data11":30.39},
        {"idx":14 ,"data1":27.30,"data2":3800.00,"data3":3865.20,"data4":17.45,"data5":32.00,"data6":1234.02,"data7":1240.64,"data8":83.50,"data9":18.54,"data10":47.60,"data11":30.38},
        {"idx":15 ,"data1":27.30,"data2":3800.00,"data3":3887.89,"data4":17.41,"data5":32.00,"data6":1245.97,"data7":1222.18,"data8":83.80,"data9":18.52,"data10":47.11,"data11":30.42},
        {"idx":16 ,"data1":27.30,"data2":3800.00,"data3":3788.40,"data4":17.48,"data5":32.00,"data6":1213.38,"data7":1215.11,"data8":82.10,"data9":18.50,"data10":48.80,"data11":30.16},
        {"idx":17 ,"data1":27.31,"data2":3800.00,"data3":3734.20,"data4":17.57,"data5":32.00,"data6":1194.56,"data7":1196.09,"data8":80.83,"data9":18.51,"data10":49.30,"data11":30.52},
        {"idx":18 ,"data1":27.33,"data2":3800.00,"data3":3746.00,"data4":17.38,"data5":32.00,"data6":1202.34,"data7":1197.78,"data8":80.67,"data9":18.45,"data10":47.60,"data11":30.42},
        {"idx":19 ,"data1":27.33,"data2":3800.00,"data3":3743.00,"data4":17.61,"data5":32.00,"data6":1197.76,"data7":1195.38,"data8":80.87,"data9":18.61,"data10":49.33,"data11":30.48},
        {"idx":20 ,"data1":27.47,"data2":3800.00,"data3":3746.00,"data4":17.34,"data5":32.00,"data6":1198.72,"data7":1197.54,"data8":80.58,"data9":18.51,"data10":48.70,"data11":30.50},
        {"idx":21 ,"data1":27.60,"data2":3800.00,"data3":3732.50,"data4":17.31,"data5":32.00,"data6":1195.26,"data7":1192.06,"data8":80.47,"data9":18.53,"data10":49.90,"data11":30.40},
        {"idx":22 ,"data1":28.09,"data2":3900.00,"data3":3838.00,"data4":17.46,"data5":32.00,"data6":1228.16,"data7":1227.97,"data8":84.68,"data9":18.45,"data10":53.70,"data11":31.40},
        {"idx":23 ,"data1":28.30,"data2":3800.00,"data3":3746.00,"data4":17.20,"data5":32.00,"data6":1198.72,"data7":1196.89,"data8":83.32,"data9":18.38,"data10":48.30,"data11":30.69},
        {"idx":24 ,"data1":28.32,"data2":3900.00,"data3":3828.60,"data4":17.15,"data5":32.00,"data6":1226.62,"data7":1223.56,"data8":84.53,"data9":18.42,"data10":49.60,"data11":31.66},
        {"idx":25 ,"data1":28.32,"data2":3900.00,"data3":3828.60,"data4":17.37,"data5":32.00,"data6":1225.02,"data7":1225.40,"data8":84.50,"data9":18.46,"data10":48.40,"data11":30.97},
        {"idx":26 ,"data1":28.33,"data2":3900.00,"data3":3850.00,"data4":17.09,"data5":32.00,"data6":1232.00,"data7":1228.57,"data8":84.87,"data9":18.45,"data10":50.22,"data11":31.73},
        {"idx":27 ,"data1":28.35,"data2":3900.00,"data3":3900.00,"data4":17.47,"data5":32.00,"data6":1164.32,"data7":21.93,"data8":83.00,"data9":18.16,"data10":49.00,"data11":31.30},
        {"idx":28 ,"data1":28.36,"data2":3900.00,"data3":3907.20,"data4":17.57,"data5":32.00,"data6":1246.27,"data7":1223.73,"data8":84.70,"data9":18.58,"data10":46.60,"data11":30.92},
        {"idx":29 ,"data1":28.40,"data2":3900.00,"data3":3892.67,"data4":17.50,"data5":32.00,"data6":1266.35,"data7":1011.32,"data8":77.25,"data9":18.83,"data10":47.17,"data11":31.32},
        {"idx":30 ,"data1":28.40,"data2":3900.00,"data3":3777.75,"data4":17.53,"data5":32.00,"data6":1208.72,"data7":1167.48,"data8":79.58,"data9":18.59,"data10":46.75,"data11":30.88},
        {"idx":31 ,"data1":28.40,"data2":3900.00,"data3":4014.60,"data4":17.64,"data5":32.00,"data6":1288.26,"data7":1271.15,"data8":88.27,"data9":18.43,"data10":49.50,"data11":30.94},
        {"idx":32 ,"data1":28.42,"data2":3900.00,"data3":3989.00,"data4":17.62,"data5":32.00,"data6":1276.48,"data7":1274.04,"data8":87.37,"data9":18.45,"data10":48.40,"data11":31.25},
        {"idx":33 ,"data1":28.46,"data2":3900.00,"data3":3921.40,"data4":17.38,"data5":32.00,"data6":1219.39,"data7":1354.52,"data8":83.07,"data9":18.52,"data10":51.00,"data11":30.84},
        {"idx":34 ,"data1":28.49,"data2":3900.00,"data3":3840.00,"data4":17.16,"data5":32.00,"data6":1228.80,"data7":1229.75,"data8":84.67,"data9":18.38,"data10":51.63,"data11":30.59},
        {"idx":35 ,"data1":28.50,"data2":3900.00,"data3":4254.56,"data4":17.35,"data5":32.00,"data6":1361.35,"data7":1344.16,"data8":93.48,"data9":18.52,"data10":50.67,"data11":31.08}
    ]

    return (
    <>
    <div>

      {/* <div>
        <b>{pmsDatas[state].idx}</b> <span>({pmsDatas[state].data1})</span> <span>({pmsDatas[state].data2})</span>
      </div>
      <div>
        <b>{pmsDatas[state].idx}</b> <span>({pmsDatas[state].data1})</span> <span>({pmsDatas[state].data2})</span>
      </div>
      <div>
        <b>{pmsDatas[state].idx}</b> <span>({pmsDatas[state].data1})</span> <span>({pmsDatas[state].data2})</span>
      </div> */}
      
    <div>
      {pmsDatas.map(user => (
        <Pms user={user} />
      ))}
    </div>

        <hr />
    </div>
    </>
    )
}

function Pms( pms) {
    return (
    <div>
        <b>{pms.idx}</b> <span>({pms.data1})</span> <span>({pms.data2})</span> <span>({pms.data3})</span>
    </div>
    )
}