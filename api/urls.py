from django.urls import path

from . import views

urlpatterns = [
    # authentication
    path('signin/', views.signIn),
    path('signout/', views.signOut),

    path('whoami/', views.whoAmI),

    # user
    path('studentList/', views.studentList),
    path('studentDetail/<int:pk>/', views.studentDetail),
    path('guideList/', views.guideList),
    path('guideDetail/<int:pk>/', views.guideDetail),
    path('coordinatorList/', views.coordinatorList),
    path('coordinatorDetail/<int:pk>/', views.coordinatorDetail),
    path('assistantList/', views.assistantList),
    path('assistantDetail/<int:pk>/', views.assistantDetail),

    # other
    path('assignmentList/', views.assignmentList),
    path('assignmentDetail/<int:pk>/', views.assignmentDetail),
    path('approvalList/', views.approvalList),
    path('approvalDetail/<int:pk>/', views.approvalDetail),
    path('gradeList/', views.gradeList),
    path('gradeDetail/<int:pk>/', views.gradeDetail),
    path('commentList/', views.commentList),
    path('commentDetail/<int:pk>/', views.commentDetail),
    path('projectList/', views.projectList),
    path('projectDetail/<int:pk>/', views.projectDetail),
    path('teamList/', views.teamList),
    path('teamDetail/<int:pk>/', views.teamDetail),
    path('fileList/', views.fileList),
    path('fileDetail/<int:pk>/', views.fileDetail),
]
