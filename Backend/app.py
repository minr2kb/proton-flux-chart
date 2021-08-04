import json
from datetime import date, timedelta
from urllib import request

from flask import Flask

app = Flask("Proton-Flux-Chart")

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSON_AS_ASCII'] = False


def urlMaker(n):
    # url = 'ftp://ftp.swpc.noaa.gov/pub/lists/ace/'
    # yesterday = date.today() - timedelta(n)
    # temp = str(yesterday.strftime('%Y%m%d'))
    # url = url + str(yesterday.strftime('%Y%m%d'))
    # url = url + '_ace_sis_5m.txt'
    url = "ftp://ftp.swpc.noaa.gov/pub/lists/ace/2021080" + str(
        4 - n) + "_ace_sis_5m.txt"
    return url


def download(n):
    remote_url = urlMaker(n)
    req = request.Request(remote_url)
    html = request.urlopen(req).read().decode("utf-8")
    return html


def data2json():
    data = {}
    for i in range(2, -1, -1):
        file = download(i)
        lines = file.split("\n")
        lines.pop(len(lines) - 1)
        for line in lines:
            if "#" in line or ":" in line:
                pass
            else:
                line = ' '.join(line.split())
                line = line.split(' ')
                date = line[0] + line[1] + line[2]
                data.setdefault(
                    date, {
                        "time": [],
                        "flux10_S": [],
                        "flux10": [],
                        "flux30_S": [],
                        "flux30": []
                    })
                data[date]["time"].append(int(line[3]))
                data[date]["flux10_S"].append(int(line[6]))
                data[date]["flux10"].append(float(line[7]))
                data[date]["flux30_S"].append(int(line[8]))
                data[date]["flux30"].append(float(line[9]))
        result = json.dumps(data, ensure_ascii=False)
    return result


@app.route('/')
def getData():
    data = data2json()
    return data


if __name__ == "__main__":
    app.run(debug=True, threaded=True)