from django.db import models

from storages.backends.s3 import S3File
from storages.backends.s3boto3 import S3Boto3Storage


class InvoiceFileS3Storage(S3Boto3Storage):
    location = "cv"
    
from uuid import uuid4

...

def get_invoice_s3_file_path(instance: "Invoice", filename: str):
    return f"{uuid4().hex}.{filename.split(".")[-1]}"


class Invoice(models.Model):
    cost_center = models.CharField(max_length=255)
    generated_at = models.DateTimeField(auto_now_add=True)

    file = models.FileField(
        max_length=100,
        storage=InvoiceFileS3Storage,
        upload_to=get_invoice_s3_file_path,
    )
    
    def __str__(self):
        return f"Invoice no.{self.id}"
    
    def open(self) -> S3File:
        storage = InvoiceFileS3Storage()
        return storage.open(self.file.name, mode="rb")