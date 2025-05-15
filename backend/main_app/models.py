from django.db import models

class Review(models.Model):
    name = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.rating} Stars"
