from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Review
import json

@csrf_exempt
def reviews_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            review = Review.objects.create(
                name=data['name'],
                rating=data['rating'],
                comment=data['comment']
            )
            return JsonResponse({
                "id": review.id,
                "name": review.name,
                "rating": review.rating,
                "comment": review.comment
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    elif request.method == 'GET':
        reviews = list(Review.objects.all().order_by('-id').values())
        return JsonResponse(reviews, safe=False)
