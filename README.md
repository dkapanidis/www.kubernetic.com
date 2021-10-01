# Kubernetic Landing page

This is the website for https://kubernetic.com/

# Setup

Website is pushed to a Google Storage Bucket which is served by Google Cloud CDN.

To setup the bucket with CDN:

```sh
gcloud compute backend-buckets create kubernetic --enable-cdn --gcs-bucket-name=www.kubernetic.com
gsutil web set -m index.html gs://www.kubernetic.com
```

# GIFs

GIFs are created with format 1500x840
