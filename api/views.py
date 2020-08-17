import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from django.shortcuts import HttpResponse, render
from django.utils import timezone
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import (Assignment, Assistant, Comment, Coordinator, File, Grade,
                     GroupRequest, Guide, Preference, Project, ProjectRequest,
                     Student, Team)
from .serializers import (AssignmentSerializer, AssistantSerializer,
                          CommentSerializer, CoordinatorSerializer,
                          FileSerializer, GradeSerializer,
                          GroupRequestSerializer, GuideSerializer,
                          PreferenceSerializer, ProjectRequestSerializer,
                          ProjectSerializer, StudentSerializer, TeamSerializer)

domains = (
    ("CS", "Cyber Security (Forensics, Blockchain Technology, Biometrics Security, Cryptographic Techniques)"),
    ("IP", "Image Processing (Computer Vision)"),
    ("AI", "Artifical Intelligence (Machine Learning, Natural Language Processing, Robotics)"),
    ("CN", "Computer Networking"),
    ("BD", "Big Data Processing"),
    ("EHIA", "Embedded and Hardware Integrated Applications (IOT)"),
    ("ARVR", "Augmented Reality and Virtual Reality"),
    ("GIS", "GIS"),
    ("CLOUD", "Cloud Computing (High Performance Computing)"),
    ("SP", "System Programming (Compiler construction, OS, Device drivers)"),
    ("QC", "Quantum Computing"),
    ("STA", "Software Testing Automation"),
    ("OTHER", "Other"),
)
category = (("IN", "Internal"),
            ("EX", "External"),
            ("ID", "Inter-disciplinary"),)

thrust_areas = (("NS", "Network and Security"),
                ("AD", "Application Development"),
                ("IM", "Information Management"),
                ("KS", "Knowledge-based systems"),)

# admin views


@api_view()
@permission_classes([permissions.AllowAny])
def rStudent(request):
    data = []
    for student in Student.objects.all().order_by('roll_number'):
        student_data = {
            "student id": student.id,
            "student branch": student.branch,
            "student roll number": student.roll_number,
            "student email": student.email,
            "student name": " ".join([student.first_name.strip(), str(student.last_name or "").strip()]),
        }
        try:
            project = Project.objects.get(student=student)
            student_data.setdefault("project id", project.id)
            student_data.setdefault("project name", project.title)
        except:
            student_data.setdefault("project id", "N/A")
            student_data.setdefault("project name", "N/A")
        try:
            team = Team.objects.get(id=student.team.id)
            student_data.setdefault("group id", team.id)
        except:
            student_data.setdefault("group id", "N/A")
        try:
            guide = Guide.objects.get(id=team.guide_id)
            student_data.setdefault("guide id", guide.id)
            student_data.setdefault("guide name", " ".join(
                [guide.first_name.strip(), str(guide.last_name or "").strip()]))
        except:
            student_data.setdefault("guide id", "N/A")
            student_data.setdefault("guide name", "N/A")
        data.append(student_data)
    return Response(data=data, status=status.HTTP_200_OK)


@api_view()
@permission_classes([permissions.AllowAny])
def rGroup(request):
    data = []
    for team in Team.objects.all().order_by('id'):
        team_data = {
            "team id": team.id,
        }
        project_data = {}
        try:
            project = Project.objects.get(team=team.id)
            project_data.setdefault("project id", project.id)
            project_data.setdefault("project name", project.title)
            project_data.setdefault("project type", project.category)
            team_data.setdefault("project data", project_data)
        except:
            project_data.setdefault("project id", "N/A")
            project_data.setdefault("project name", "N/A")
            project_data.setdefault("project type", "N/A")
            team_data.setdefault("project data", project_data)
        try:
            students = Student.objects.filter(team_id=team.id)
            leader = Student.objects.get(id=team.leader_id)
            leader_name = " ".join(
                [leader.first_name.strip(), str(leader.last_name or "").strip()])
            students_data_array = []
            for student in students:
                student_data = {}
                student_data.setdefault("student id", student.id)
                student_data.setdefault("student name", " ".join(
                    [student.first_name.strip(), str(student.last_name or "").strip()]))
                student_data.setdefault(
                    "student photo", student.profile_photo or None)
                students_data_array.append(student_data)
            team_data.setdefault("leader name", leader_name)
            team_data.setdefault("student data", students_data_array)
        except:
            team_data.setdefault("leader name", "N/A")
            team_data.setdefault("student data", "N/A")
        try:
            guide = Guide.objects.get(id=team.guide_id)
            guide_data = {}
            guide_data.setdefault("guide id", guide.id)
            guide_data.setdefault("guide photo", guide.profile_photo or None)
            guide_data.setdefault("guide name", " ".join(
                [guide.first_name.strip(), str(guide.last_name or "").strip()]))
            team_data.setdefault("guide data", guide_data)
        except:
            guide_data = {}
            guide_data.setdefault("guide id", "N/A")
            guide_data.setdefault("guide name", "N/A")
            guide_data.setdefault("guide photo", "N/A")
            team_data.setdefault("guide data", guide_data)
        data.append(team_data)
    return Response(data=data, status=status.HTTP_200_OK)


@api_view()
@permission_classes([permissions.AllowAny])
def rGuide(request):
    data = []
    for guide in Guide.objects.all():
        guide_data = {
            "guide id": guide.id,
            "guide name": " ".join(
                [guide.first_name.strip(), str(guide.last_name or "").strip()]),
            "guide branch": guide.branch
        }
        try:
            teams = Team.objects.filter(guide=guide)
            team_data = []
            for team in teams:
                temp_team_data = {
                    "team id": team.id
                }
                try:
                    project = Project.objects.get(team=team)
                    temp_team_data.setdefault("project id", project.id)
                    temp_team_data.setdefault("project title", project.title)
                except:
                    temp_team_data.setdefault("project id", "N/A")
                    temp_team_data.setdefault("project title", "N/A")
                finally:
                    team_data.append(temp_team_data)
            guide_data.setdefault("team data", team_data)
        except:
            guide_data.setdefault("team data", "N/A")
        data.append(guide_data)
    return Response(data=data, status=status.HTTP_200_OK)


@api_view()
@permission_classes([permissions.AllowAny])
def rProject(request):
    data = []
    for team in Team.objects.all().order_by("id"):
        project_data = {
            "team id": team.id
        }
        try:
            project = Project.objects.get(team=team)
            project_data.setdefault("project exists", True)
            project_data.setdefault("project id", project.id)
            project_data.setdefault("project status", project.status)
            project_data.setdefault("project title", project.title)
            project_data.setdefault("project category", project.category)
            project_data.setdefault("project domain", project.domain)
            project_data.setdefault("project description", project.description)
            project_data.setdefault(
                "project explanatory field", project.explanatory_field or "")
        except:
            project_data.setdefault("project exists", False)
        try:
            guide = Guide.objects.get(team=team)
            project_data.setdefault("guide name", " ".join(
                [guide.first_name.strip(), str(guide.last_name or "").strip()]))
            project_data.setdefault("guide id", guide.id)
        except:
            project_data.setdefault("guide name", "N/A")
            project_data.setdefault("guide id", "N/A")
        data.append(project_data)
    return Response(data=data, status=status.HTTP_200_OK)
# if submitted link should be disabled


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([permissions.AllowAny])
def rAssignment(request, pk, *args, **kwargs):
    assignment = Assignment.objects.get(pk=pk)
    files = File.objects.filter(assignment=assignment)
    # assignment details
    res = {}
    assignment_details = {}
    _files = []
    for file in files:
        _files.append({
            "file_id": file.id,
            "file_name": file.file.name,
            "file_url": file.file.url,
        })
    _assignment = {
        "assignment_id": assignment.id,
        "assignment_title": assignment.title,
        "assignment_weightage": assignment.weightage,
        "assignment_description": assignment.description,
        "assignment_due_on": assignment.due,
        "assignment_posted_on": assignment.posted
    }
    assignment_details.setdefault("assignment", _assignment)
    assignment_details.setdefault("files", _files)
    res.setdefault("assignment_details", assignment_details)
    # submission status
    submission_status = []

    for team in Team.objects.all():
        _submission_status = {
            "team_id": team.id
        }
        try:
            # if submitted link should be disabled
            grade = Grade.objects.get(students=team.leader)
            if grade.turned_in:
                _submission_status.setdefault("status", "Submitted")
                print(grade.marks_obtained)
                # to be checked later
                if grade.marks_obtained != None:
                    _submission_status["status"] = "Graded"
            else:
                _submission_status.setdefault("status", "Unsubmitted")
        except:
            _submission_status.setdefault("status", "N/A")
        submission_status.append(_submission_status)
    res.setdefault("submissionStatus", submission_status)
    return Response(data={"data": res})
# if submitted link should be disabled


@api_view()
@permission_classes([permissions.AllowAny])
def rGroupSubmissionDetails(request, assignmentId, teamId):
    team = Team.objects.get(id=teamId)
    res = {}
    weightage = Assignment.objects.get(id=assignmentId).weightage
    students = Student.objects.filter(team=team)
    student_data = []
    for student in students:
        _student_data = {
            "student_id": student.id,
            "student_roll": student.roll_number
        }
        try:
            grade = Grade.objects.get(students=student)
            _student_data.setdefault(
                "student_marks", grade.marks_obtained)
        except:
            _student_data.setdefault(
                "student_marks", "N/A")
        student_data.append(_student_data)
    leader = Student.objects.get(id=team.leader.id)
    try:
        files = File.objects.filter(assignment_id=assignmentId).filter(
            submitted_by=leader.email)
        file_list = []
        for file in files:
            _file = {
                "id": file.id,
                "file_name": file.file.name,
                "file_url": file.file.url
            }
            file_list.append(_file)
    except:
        pass
    res.setdefault("students_data", student_data)
    res.setdefault("file_list", file_list)
    res.setdefault("weightage", weightage)
    return Response(data=res)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def rCreateAssignment(request):
    title = request.data.get('title')
    description = request.data.get('description')
    weightage = int(request.data.get('weightage'))
    posted = timezone.datetime.fromtimestamp(int(request.data.get('posted')))
    due = timezone.datetime.fromtimestamp(int(request.data.get('due')))
    coordinator = request.data.get("coordinator")

    # for each student create grade

    print(request.data)

    data = {
        "title": title,
        "description": description,
        "due": due,
        "posted": posted,
        "weightage": weightage,
        "coordinator": coordinator
    }
# file handling remaining
    serializer = AssignmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        assignment = Assignment.objects.get(title=title)
        for student in Student.objects.all():
            Grade.objects.create(
                students=student, guide=None, assignment=assignment)
        return Response(status=status.HTTP_201_CREATED)
# post save signal to add grade objects for existing assignments after user creation.
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def rSubmissionStatistics(request):
    teams = Team.objects.all()
    res = []
    for team in teams:
        _team_data_item = {
            "team_id": team.id
        }
        grade_list = []
        leader = Student.objects.get(id=team.leader.id)
        try:
            grades = Grade.objects.filter(students_id=leader.id)
            for grade in grades:
                submission_status = "Not submitted"
                _t_grade = {}
                if grade.turned_in:
                    submission_status = "Submitted"
                    if grade.marks_obtained != None:
                        submission_status = "Graded"

                _t_grade.setdefault("submission_status", submission_status)
                _t_grade.setdefault(
                    "assignment_name", Assignment.objects.get(id=grade.assignment.id).title)
                grade_list.append(_t_grade)
        except:
            pass
        _team_data_item.setdefault("grades", grade_list)

        res.append(_team_data_item)

    return Response(data=res, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def rGradingStatistics(request):
    students = Student.objects.all()
    res = []
    for student in students:
        student_data = {
            "roll_number": student.roll_number
        }

        grade_list = []

        try:
            grades = Grade.objects.filter(students=student)
            print(grades)

            for grade in grades:

                _grade = {
                    "assignment_name": Assignment.objects.get(id=grade.assignment.id).title
                }
                submission_status = "Not Submitted"
                if grade.turned_in:
                    submission_status = "Submitted"
                    if grade.marks_obtained != None:
                        submission_status = int(grade.marks_obtained)
                _grade.setdefault("marks", submission_status)
                print(_grade)
                grade_list.append(_grade)
        except:
            pass

        student_data.setdefault("grade_list", grade_list)

        res.append(student_data)

    return Response(data=res, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def rGroupRequest(request, *args, **kwargs):
    res = {}
    # GET

    group_requests = []
    for group_request in GroupRequest.objects.all():
        _t = {
            "id": group_request.id,
            "action": group_request.action,
            "status": group_request.status,
            "new_leader": group_request.new_leader,
            "old_leader": group_request.old_leader,
            "add_student": group_request.add_student,
            "remove_student": group_request.remove_student,
            "team": group_request.team.id,
            "description": group_request.description,
            "generated": group_request.generated.strftime("%m/%d/%Y, %H:%M:%S"),
            "processed": group_request.processed.strftime("%m/%d/%Y, %H:%M:%S"),
        }
        group_requests.append(_t)

    res.setdefault("group requests", group_requests)

    return Response(data=res)


@api_view(["GET", "PUT"])
@permission_classes([permissions.AllowAny])
def rGroupRequestManage(request, id, status, *args, **kwargs):
    group_request = GroupRequest.objects.get(id=id)

    action = group_request.action
    if action == "Change Leader":
        if status == "A":
            team = Team.objects.get(id=group_request.team.id)
            team.leader = group_request.new_leader
            team.save()
            group_request.status = "A"
            group_request.save()
        else:
            group_request.status = "R"
            group_request.save()
    elif action == "Add":
        if status == "A":
            student = Student.objects.get(id=group_request.add_student)
            student.team = group_request.team
            student.save()
            group_request.status = "A"
            group_request.save()
        else:
            group_request.status = "R"
            group_request.save()
    else:
        if status == "A":
            student = Student.objects.get(id=group_request.add_student)
            student.team = None
            student.save()
            group_request.status = "A"
            group_request.save()
        else:
            group_request.status = "R"
            group_request.save()
    return Response()


@api_view(["GET", "PUT"])
@permission_classes([permissions.AllowAny])
def rProjectRequest(request, * args, **kwargs):
    res = {}
    project_requests = ProjectRequest.objects.all()
    project_req_list = []
    for project_request in project_requests:
        _t = {
            "project": project_request.project.id,
            "description": project_request.description,
            "status": project_request.status,
            "id": project_request.id,
            "created": project_request.created.strftime("%m/%d/%Y, %H:%M:%S"),
            "last_modified": project_request.last_modified.strftime("%m/%d/%Y, %H:%M:%S"),
        }
        project_req_list.append(_t)
    res.setdefault("project_requests", project_req_list)
    return Response(data=res, status=status.HTTP_200_OK)


@api_view(["GET", "PUT"])
@permission_classes([permissions.AllowAny])
def rProjectRequestManage(request, id, status, *args, **kwargs):
    project_request = ProjectRequest.objects.get(id=id)
    if status == "A":
        project_request.status = "A"
        project_request.save()
    if status == "R":
        project = Project.objects.get(id=project_request.project.id)
        project.delete()
        project_request.delete()

        project_request.save()
    if status == "R":
        project = Project.objects.get(id=project_request.project.id)
        project.delete()
        project_request.delete()

    return Response()

# Guide views -> prefix: rg


@api_view()
@permission_classes([permissions.AllowAny])
def rgDashboard(request):
    res = {}
    _user = Guide.objects.all()[0]
    group_info = []
    for team in Team.objects.filter(guide=_user):
        member_count = len(Student.objects.filter(team=team))
        _t = {
            "id": team.id,
            "leader_name": team.leader.first_name,
            "member_count": member_count,
        }
        try:
            project = Project.objects.get(team=team)
            _t.setdefault("domain", project.domain)
            group_info.append(_t)
        except:
            _t.setdefault("domain", "N/A")
            group_info.append(_t)

    res.setdefault("group_info", group_info)
    return Response(data=res)


@api_view()
@permission_classes([permissions.AllowAny])
def rgAssignmentDetails(request, pk, groupId, *args, **kwargs):
    response = {}
    studentList = []
    for student in Student.objects.filter(team_id=groupId):
        studentData = {
            "student roll number": student.roll_number
        }
        try:
            grade = Grade.objects.get(
                students=student, assignment=Assignment.objects.get(pk=pk))
            studentData.setdefault("grade", grade.marks_obtained)
        except:
            studentData.setdefault("grade", "N/A")
        studentList.append(studentData)

    assignment = Assignment.objects.get(pk=pk)
    assignmentDetails = {
        "title": assignment.title,
        "description": assignment.description,
        "weightage": assignment.weightage,
        "due": assignment.due.strftime("%m/%d/%Y, %H:%M:%S"),
        "posted": assignment.posted.strftime("%m/%d/%Y, %H:%M:%S")
    }

    fileAttachements = File.objects.filter(
        submitted_by=assignment.coordinator.email)
    _attachments = []
    for file in fileAttachements:
        _file = {
            "id": file.id,
            "file_name": file.file.name,
            "file_url": file.file.url
        }
        _attachments.append(_file)
    assignmentDetails.setdefault("attachments", _attachments)

    teamSubmissions = []
    teamFileUploads = File.objects.filter(team_id=groupId)
    for file in teamFileUploads:
        _file = {
            "id": file.id,
            "file_name": file.file.name,
            "file_url": file.file.url
        }
        teamSubmissions.append(_file)

    response.setdefault("student list", studentList)
    response.setdefault("assignment details", assignmentDetails)
    response.setdefault("team submissions", teamSubmissions)

    return Response(data=response)


@api_view(["PUT"])
@permission_classes([permissions.AllowAny])
def rgAssignGrades(request):
    student_grade = request.data.get("student_grade")
    # print(request.data, type(request.data))
    for i in student_grade:
        _g = Grade.objects.filter(students=i.get("student_id")).filter(
            assignment=request.data.get("assignment_id"))[0]
        if (_g.assignment.weightage >= i.get("marks_obtained")) and (i.get("marks_obtained") >= 0):
            _g.marks_obtained = i.get("marks_obtained")
            _g.save()
            # print(_g.marks_obtained)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response()


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([permissions.AllowAny])
def rgAssignmentList(request, groupId, *args, **kwargs):
    team = Team.objects.get(id=groupId)
    grades = Grade.objects.filter(students=team.leader)
    response = []
    for grade in grades:
        _assignment = Assignment.objects.get(grade=grade)
        _t = {
            "assignment id": _assignment.id,
            "assignment title": _assignment.title,
            "assignment due": _assignment.due.strftime("%m/%d/%Y, %H:%M:%S"),
            "assignment posted": _assignment.posted.strftime("%m/%d/%Y, %H:%M:%S"),
            "assignment weightage": _assignment.weightage,
        }
        if grade.turned_in:
            _t.setdefault("grading status", "Submitted")
            if grade.marks_obtained != None:
                _t.setdefault("grading status", "Graded")
        else:
            _t.setdefault("grading status", "Not Submitted")
        response.append(_t)
    return Response(data=response)


@api_view(['GET', 'PUT'])
@permission_classes([permissions.AllowAny])
def rgDetailsForm(request):
    if request.method == "GET":
        guide = Guide.objects.all()[0]
        # print(request.user)
        # guide = Guide.objects.get(id=request.user.id)
        response = {
            "guide initials": guide.initials,
        }
        preferences = guide.preferences.all()
        _preferences = []
        for preference in preferences:
            _t = {
                "area of interest": preference.area_of_interest,
                "thrust area": preference.thrust_area
            }
            _preferences.append(_t)
        response.setdefault("preferences", _preferences)

        return Response(data=response)
    elif request.method == "PUT":
        # guide = Guide.objects.all()[0]
        guide = Guide.objects.get(id=request.user.id)
        data = request.data
        if len(data["preferences"]) > 4:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        for preference in data["preferences"]:
            if not preference["area of interest"] in [i[0] for i in domains]:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            if not preference["thrust area"] in [i[0] for i in thrust_areas]:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        guide.initials = data["guide initials"]
        guide.preferences.clear()
        guide.save()

        for preference in data["preferences"]:
            _p = Preference.objects.filter(area_of_interest=preference["area of interest"]).filter(
                thrust_area=preference["thrust area"]).first()
            if _p == None:
                _p = Preference.objects.create(
                    area_of_interest=preference["area of interest"], thrust_area=preference["thrust area"])
            guide.preferences.add(_p)

        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view()
@permission_classes([permissions.AllowAny])
def rgProfile(request):
    guide = Guide.objects.all()[0]
    # request.user
    response = {
        "personal": {
            "name": " ".join([guide.first_name.strip(), str(guide.last_name or "").strip()]),
            "initials": guide.initials,
            "email": guide.email
        }
    }
    group_details = []
    teams = Team.objects.filter(guide=guide)
    for team in teams:
        leader = Student.objects.get(id=team.leader.id)
        _t = {
            "team id": team.id,
            "leader": " ".join(
                [leader.first_name.strip(), str(leader.last_name or "").strip()])
        }
        students = Student.objects.filter(team=team)
        member_list = []
        for student in students:
            _s = {
                "student name": " ".join([student.first_name.strip(), str(student.last_name or "").strip()]),
                "student profile photo": student.profile_photo or None,
                "student email": student.email,
                "student roll number": student.roll_number,
                "student branch": student.branch
            }
            member_list.append(_s)

        project = Project.objects.filter(team=team).first()
        if project != None:
            project_details = {
                "project title": project.title,
                "project description": project.description,
                "project domain": project.domain,
                "project category": project.category,
                "project explanatory field": project.explanatory_field,
            }
        else:
            project_details = {}
        _t.setdefault("member list", member_list)
        _t.setdefault("project", project_details)
        group_details.append(_t)

    response.setdefault("group_details", group_details)

    return Response(data=response)

# Student views

# misc


""" change profile picture and password """


@ api_view()
def whoAmI(request):
    try:
        userType = request.user.groups.all()[0].name.lower()
        return Response({"type": f"{userType}"}, status=status.HTTP_200_OK)
    except:
        return Response({"type": "unknown"}, status=status.HTTP_200_OK)


@ api_view()
def signOut(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)


@ api_view(['POST'])
@ permission_classes([permissions.AllowAny])
def signIn(request):
    if request.method == 'POST':
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse()
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@ api_view(['POST'])
@ permission_classes([permissions.AllowAny])
def signUp(request):
    if request.method == 'POST':
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        roll_number = request.data.get("roll_number")
        branch = request.data.get("branch")
        if branch == "Information Technology":
            branch = "IT"
        elif branch == "Computer Science":
            branch = "CS"
        elif branch == "Mechanical":
            branch = "MECH"
        elif branch == "Electronics":
            branch = "ETRX"
        elif branch == "Electronics and Telecommunication":
            branch = "EXTC"
        data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
            "branch": branch,
            "roll_number": roll_number,
            "profile_photo": None,
            "is_staff": False,
            "is_active": True
        }
        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['POST'])
@ permission_classes([permissions.AllowAny])
def guideSignUp(request):
    if request.method == 'POST':
        if request.user.has_perm('api.add_guide'):
            email = request.data.get("email")
            password = request.data.get("password")
            first_name = request.data.get("first_name")
            last_name = request.data.get("last_name")
            # area_of_interest = request.data.get("area_of_interest")
            # thrust_area = request.data.get("thrust_area")
            initials = request.data.get("initials")
            branch = request.data.get("branch")
            if branch == "Information Technology":
                branch = "IT"
            elif branch == "Computer Science":
                branch = "CS"
            elif branch == "Mechanical":
                branch = "MECH"
            elif branch == "Electronics":
                branch = "ETRX"
            elif branch == "Electronics and Telecommunication":
                branch = "EXTC"
            print(request.data)
            data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password,
                "branch": branch,
                # "area_of_interest": area_of_interest,
                # "thrust_area": thrust_area,
                "initials": initials,
                "profile_photo": None,
                "is_staff": False,
                "is_active": True
            }
            print(data)
            serializer = GuideSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
def studentList(request):
    if request.method == 'GET':
        if request.user.has_perm('api.view_student'):
            data = Student.objects.all().order_by('roll_number')
            serializer = StudentSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'POST':
        if request.user.has_perm('api.add_student'):
            print(request.data)
            print(type(request.data))
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
