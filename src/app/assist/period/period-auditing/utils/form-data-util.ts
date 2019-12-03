
export class FormDataUtil {
    public static covert(obj: Object): FormData {
        let formData = new FormData();

        Object.keys(obj).forEach(it => {
            if (typeof obj[it] !== 'object') {
                if (typeof obj[it] === 'boolean') {
                    formData.append(it, obj[it] ? '1' : '0');
                } else {
                    formData.append(it, obj[it]);
                }
            } else if (Array.isArray(obj[it])) {
                this.toArrayFileds(it, obj[it], formData);
            } else {
                if (obj[it] instanceof Date) {
                    formData.append(it, obj[it].getTime());
                } else if (obj[it] && Object.keys(obj[it]).findIndex(itx => itx == 'id') > -1) {
                    formData.append(`${it}.id`, obj[it]['id']);
                }
            }
        });

        return formData;
    }

    public static toArrayFileds(name: string, values: any[], formData?: FormData): FormData {
        if (!formData) {
            formData = new FormData();
        }
        values.forEach((value, index) => {
            // formData.append(name, value); // 这里有bug，不能是对象类型
            if (typeof value !== 'object') {
                if (typeof value === 'boolean') {
                    formData.append(name, value ? '1' : '0');
                } else {
                    formData.append(name, value);
                }
            } else if (Array.isArray(value)) {
                // Do nothing
            } else {
                for (let key of Object.keys(value)) {
                    if (value[key] && typeof value[key] !== 'object') {
                        formData.append(`${name}[${index}].${key}`, value[key]);
                    }
                }
            }
        });
        return formData;
    }

    public static nullValFilter(obj: any) {
        let target = {};
        for (let key of Object.keys(obj)) {
            if (obj[key] === null || obj[key] === undefined) {
                continue;
            }
            target[key] = obj[key];
        }
        return target;
    }

    public static dateValFilter(obj: any) {
        for (let key of Object.keys(obj)) {
            if (obj[key] instanceof Date) {
                obj[key] = obj[key].getTime();
            }
        }
        return obj;
    }

    public static searchParamFilter(obj) {
        let val = FormDataUtil.nullValFilter(obj);
        val = FormDataUtil.dateValFilter(val);
        return val;
    }
}
