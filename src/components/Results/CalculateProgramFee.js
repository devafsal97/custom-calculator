  const updateTiers = (auaDiscount, baseTiers) => {
    const auaDecimal = auaDiscount / 100;
    return baseTiers.map(tier =>
      tier.map(value => (auaDiscount === 0 ? value : (1 - auaDecimal) * value))
    );
  };


  const calculateProgramFee = (acctValue, houseAUM, programType, auaDiscount) => {    
    const baseTiers = [
      [0.0025, 0.0025, 0.004, 0.005, 0.0045],
      [0.0023, 0.0023, 0.0036, 0.005, 0.0042],
      [0.0020, 0.0020, 0.0032, 0.005, 0.0038],
      [0.0017, 0.0017, 0.0027, 0.005, 0.0035],
      [0.0014, 0.0014, 0.0021, 0.005, 0.0027],
      [0.0009, 0.0009, 0.0015, 0.005, 0.0020],
      [0.0006, 0.0006, 0.0012, 0.005, 0.0015],
      [0.0003, 0.0003, 0.0008, 0.005, 0.0010],
      [0.0001, 0.0001, 0.0005, 0.005, 0.0007]
    ];
    const updatedTiers = updateTiers(auaDiscount, baseTiers);
    
    let programCol;
    switch (programType) {
      case "advisor-directed":
        programCol = 0;
        break;
      case "team-directed":
        programCol = 1;
        break;
      case "caap":
        programCol = 2;
        break;
      case "caap-small-account":
        programCol = 3;
        break;
      case "uma-sma":
        programCol = 4;
        break;
      default:
        throw new Error("Invalid Program Type");
    }

    const tierValues = [
      50000, 50000, 150000, 250000, 500000, 1000000, 3000000, 5000000, 10000000,
    ];
    let tierData = tierValues.map((value, index) => ({
      tierValue: value,
      pct: updatedTiers[index][programCol],
    }));

    let maxAUM = Math.max(acctValue, houseAUM);
    let pctOfHouseAUM = acctValue / maxAUM;
    let unUsedAcctValue = acctValue;
    let result = new Array(9).fill(0);

    for (let i = 0; i < tierValues.length; i++) {
      let tierAccum = tierValues
        .slice(0, i + 1)
        .reduce((acc, curr) => acc + curr, 0);
      if (maxAUM > tierAccum && i < 8) {
        let appliedValue =
          Math.round(pctOfHouseAUM * tierData[i].tierValue * 100) / 100;
        unUsedAcctValue -= appliedValue;
        result[i] = Math.round(tierData[i].pct * appliedValue * 100) / 100;
      } else {
        result[i] = Math.round(tierData[i].pct * unUsedAcctValue * 100) / 100;
        break;
      }
    }
    return result;
  };

export default calculateProgramFee;