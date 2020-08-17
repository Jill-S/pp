from django.urls import path
from . import views

urlpatterns = [
    # admin portal routes
    path('rStudent/', views.rStudent),
    path('rGroupRequest/', views.rGroupRequest),
    path('rProjectRequest/', views.rProjectRequest),
    path('rGroupRequestManage/<int:id>/<slug:status>/', views.rGroupRequestManage),
    path('rProjectRequestManage/<int:id>/<slug:status>/',
         views.rProjectRequestManage),
    path('rGroup/', views.rGroup),
    path('rCreateAssignment/', views.rCreateAssignment),
    path('rSubmissionStatistics/', views.rSubmissionStatistics),
    path('rGradingStatistics/', views.rGradingStatistics),
    path('rGuide/', views.rGuide),
    path('rProject/', views.rProject),
    path('rAssignment/<int:pk>/', views.rAssignment),
    path('rGroupSubmissionDetails/<int:assignmentId>/<int:teamId>/',
         views.rGroupSubmissionDetails),
    path('whoAmI/', views.whoAmI),
    # guide routes
    path('rgDashboard/', views.rgDashboard),
    path('<int:groupId>/rgAssignmentList/', views.rgAssignmentList),
    path('<int:groupId>/rgAssignmentDetails/<int:pk>/', views.rgAssignmentDetails),
    path("rgAssignGrades/", views.rgAssignGrades),

    # authentication routes
    path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('guideSignUp/', views.guideSignUp),
    path('signOut/', views.signOut),
    # model based routes
    path('studentList/', views.studentList),
    path('studentDetail/<int:pk>/', views.studentDetail),
    path('guideList/', views.guideList),
    path('guideDetail/<int:pk>/', views.guideDetail),
    path('coordinatorList/', views.coordinatorList),
    path('coordinatorDetail/<int:pk>/', views.coordinatorDetail),
    path('assistantList/', views.assistantList),
    path('assistantDetail/<int:pk>/', views.assistantDetail),
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

# MEDIA_URL = /media/
""" cannot access media from admin """
