import os
from django.http import HttpResponse,HttpResponseRedirect
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render,redirect
from bigquery import get_client
from datacheck.settings import BASE_DIR
import pandas as pd
from django.http import JsonResponse

client = None


def root(request):
    global client
    query_string = None
    if client is not None and request.method == 'POST':
        query_string=request.POST.get('query', 'empty')
        print(query_string)
        print('in post  ', client)
        results=compute_query(query_string)
        return render(request, 'results.html', {'data':results})

    else:
        print('in get  ', client)
        return render(request, 'index.html')


def report(request):
    return render(request, 'reporting.html')


def fileupload(request):
    if request.method == 'POST':
        myfile = request.FILES['creds']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        #uploaded_file_url = fs.url(filename)
        request=authenticate(request,filename)
        if request.authenticated and request.client!=None:
            return redirect('root')
        else:
            return render(request,'upload.html',{'status':False})
    else:
        return render(request, 'upload.html')


def authenticate(request,filename):
    try:
        global client
        f_path = os.path.join(BASE_DIR, 'media')
        fin_path=os.path.join(f_path,filename)
        json_key = fin_path
        client = get_client(json_key_file=json_key, readonly=True)
        request.authenticated=True
        request.client=client
        return request
    except Exception as e:
        print(e)
        request.authenticated = False
        request.client=None
        return request


def compute_query(query_string):
    job_id, _results = client.query(query_string)
    results = client.get_query_rows(job_id)
    resultsdf = pd.DataFrame(results)
    columns=resultsdf.dtypes.index
    return resultsdf.to_html()

def reporting(request):
	return render(request,"charts.html",{})
	
def GetColumns(request):
	if request.method=="POST":
		print('in columns view  ', client)
		query_string="SELECT *FROM dataset1."+request.POST["table"]
		job_id, _results = client.query(query_string)
		results = client.get_query_rows(job_id)
		resultsdf = pd.DataFrame(results)
		headers = resultsdf.dtypes.index
		columns=[]
		for col in headers:
			columns.append(col)
		return JsonResponse(columns, safe=False)
		
def	GetColumnsData(request):
	if request.method=="POST":
		query_string="SELECT "+request.POST["col1"]+","+request.POST["col2"]+" FROM dataset1."+request.POST["db"]
		job_id, _results = client.query(query_string)
		results = client.get_query_rows(job_id)
		resultsdf = pd.DataFrame(results)
		data=[]
		for col in resultsdf:
			row=[]
			for r in col:
				row.append(r)
			data.append(row)
		return JsonResponse(data)
		