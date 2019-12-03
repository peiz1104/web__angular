export class DigitalConcersion {

    static chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    static chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    static chnUnitChar = ["", "十", "百", "千"];


    /**
     * 阿拉伯数字转中文数字
     * @param num
     */
    public static numberToChinese(num) {
        let unitPos = 0;
        let strIns = '', chnStr = '';
        let needZero = false;
        const initNum = num;

        if (num === 0) {
            return this.chnNumChar[0];
        }

        while (num > 0) {
            let section = num % 10000;
            if (needZero) {
                chnStr = this.chnNumChar[0] + chnStr;
            }
            strIns = this.SectionToChinese(section);
            strIns += (section !== 0) ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }
        if (initNum >= 10 && initNum <= 19) {
            return chnStr.substr(1);
        }
        return chnStr;
    }


    private static SectionToChinese(section) {
        let strIns = '', chnStr = '';
        let unitPos = 0;
        let zero = true;
        while (section > 0) {
            let v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = this.chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = this.chnNumChar[v];
                strIns += this.chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }




}
