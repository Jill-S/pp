from rest_framework.decorators import permission_classes
from rest_framework import permissions
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from django.shortcuts import render, HttpResponse
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (Approval, Assignment, Assistant, Comment, Coordinator,
                     File, Grade, Guide, Project, Student, Team)
from .serializers import (ApprovalSerializer, AssignmentSerializer,
                          AssistantSerializer, CommentSerializer,
                          CoordinatorSerializer, FileSerializer,
                          GradeSerializer, GuideSerializer, ProjectSerializer,
                          StudentSerializer, TeamSerializer)
import json


@api_view()
def whoAmI(request):
    return Response({
        "type": request.user.groups.all()[0].name.lower()
    }, status=status.HTTP_200_OK)


@api_view()
def signOut(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def signIn(request):
    if request.method == 'POST':
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        # send back user information
        print(email, password, user)
        if user is not None:
            login(request, user)
            return HttpResponse()
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def studentList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_student'):
            data = Student.objects.all()
            serializer = StudentSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_student'):
            serializer = StudentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def studentDetail(request, pk):
    try:
        data = Student.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_student'):
                serializer = StudentSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_student'):
                serializer = StudentSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_student'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def guideList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_guide'):
            data = Guide.objects.all()
            serializer = GuideSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_guide'):
            serializer = GuideSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def guideDetail(request, pk):
    try:
        data = Guide.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_guide'):
                serializer = GuideSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_guide'):
                serializer = GuideSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_guide'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Guide.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def coordinatorList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_coordinator'):
            data = Coordinator.objects.all()
            serializer = CoordinatorSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_coordinator'):
            serializer = CoordinatorSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def coordinatorDetail(request, pk):
    try:
        data = Coordinator.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_coordinator'):
                serializer = CoordinatorSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_coordinator'):
                serializer = CoordinatorSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_coordinator'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Coordinator.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def assistantList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_assistant'):
            data = Assistant.objects.all()
            serializer = AssistantSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_assistant'):
            serializer = AssistantSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def assistantDetail(request, pk):
    try:
        data = Assistant.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_assistant'):
                serializer = AssistantSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_assistant'):
                serializer = AssistantSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_assistant'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Assistant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def assignmentList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_assignment'):
            data = Assignment.objects.all()
            serializer = AssignmentSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_assignment'):
            serializer = AssignmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def assignmentDetail(request, pk):
    try:
        data = Assignment.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_assignment'):
                serializer = AssignmentSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_assignment'):
                serializer = AssignmentSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_assignment'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Assignment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def teamList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_team'):
            data = Team.objects.all()
            serializer = TeamSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_team'):
            serializer = TeamSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def teamDetail(request, pk):
    try:
        data = Team.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_team'):
                serializer = TeamSerializer(data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_team'):
                serializer = TeamSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_team'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def commentList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_comment'):
            data = Comment.objects.all()
            serializer = CommentSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_comment'):
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def commentDetail(request, pk):
    try:
        data = Comment.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_comment'):
                serializer = CommentSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_comment'):
                serializer = CommentSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_comment'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def fileList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_file'):
            data = File.objects.all()
            serializer = FileSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_file'):
            serializer = FileSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def fileDetail(request, pk):
    try:
        data = File.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_file'):
                serializer = FileSerializer(data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_file'):
                serializer = FileSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_file'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except File.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def projectList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_project'):
            data = Project.objects.all()
            serializer = ProjectSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_project'):
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def projectDetail(request, pk):
    try:
        data = Project.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_project'):
                serializer = ProjectSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_project'):
                serializer = ProjectSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_project'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Project.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def gradeList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_grade'):
            data = Grade.objects.all()
            serializer = GradeSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_grade'):
            serializer = GradeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def gradeDetail(request, pk):
    try:
        data = Grade.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_grade'):
                serializer = GradeSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_grade'):
                serializer = GradeSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_grade'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Grade.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
def approvalList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_approval'):
            data = Approval.objects.all()
            serializer = ApprovalSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_approval'):
            serializer = ApprovalSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def approvalDetail(request, pk):
    try:
        data = Approval.objects.get(pk=pk)
        if request.method == 'GET':
            if request.user.has_perm('api.view_approval'):
                serializer = ApprovalSerializer(
                    data, context={'request': request})
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'PUT':
            if request.user.has_perm('api.change_approval'):
                serializer = ApprovalSerializer(
                    data, data=request.data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            if request.user.has_perm('api.delete_approval'):
                data.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    except Approval.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
