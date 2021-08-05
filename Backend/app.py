import json
from datetime import date, datetime, timedelta
from urllib import request
import os

from flask import Flask
import flask

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSON_AS_ASCII'] = False


def urlMaker(n):
    url = 'ftp://ftp.swpc.noaa.gov/pub/lists/ace/'
    yesterday = datetime.utcnow() - timedelta(n)
    url = url + "".join(str(yesterday)[:10].split("-"))
    url = url + '_ace_sis_5m.txt'
    # url = "ftp://ftp.swpc.noaa.gov/pub/lists/ace/2021080" + str(
    #     4 - n) + "_ace_sis_5m.txt"
    return url


def download(n):
    remote_url = urlMaker(n)
    req = request.Request(remote_url)
    html = request.urlopen(req).read().decode("utf-8")
    return html


def data2json():
    data = {"UCTtime": str(datetime.utcnow())[:-7]}
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
                date = line[0] + "-" + line[1] + "-" + line[2]
                data.setdefault(
                    date,
                    {
                        # "time": [],
                        "flux10_S": [],
                        "flux10": [],
                        "flux30_S": [],
                        "flux30": []
                    })
                # data[date]["time"].append(line[0] + "-" + line[1] + "-" +
                #                           line[2] + " " + line[3][:-2] + ":" +
                #                           line[3][-2:])
                # data[date]["time"].append(line[3][:-2] + ":" + line[3][-2:])
                data[date]["flux10_S"].append(int(line[6]))
                if int(line[6]) > 0:
                    data[date]["flux10"].append("null")
                else:
                    data[date]["flux10"].append(float(line[7]))
                data[date]["flux30_S"].append(int(line[8]))
                if int(line[8]) > 0:
                    data[date]["flux30"].append("null")
                else:
                    data[date]["flux30"].append(float(line[9]))
        # data.setdefault("uctTime", str(datetime.utcnow()))
        result = json.dumps(data, ensure_ascii=False)
    return result


@app.route('/api')
def getData():
    data = data2json()
    resp = flask.Response(data)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, threaded=True, debug=True)
