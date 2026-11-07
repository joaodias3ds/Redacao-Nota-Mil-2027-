package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowForwardIos
import androidx.compose.material.icons.outlined.Check
import androidx.compose.material.icons.outlined.Close
import androidx.compose.material.icons.outlined.Edit
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.School
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.TabRowDefaults
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.ClassRollStudent
import com.example.data.model.CorrectionStep
import com.example.data.model.TeacherEssayItem
import com.example.ui.theme.BorderLight
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun TeacherDashboardScreen(
  queue: List<TeacherEssayItem>,
  classRoll: List<ClassRollStudent>,
  onSelectEssay: (TeacherEssayItem) -> Unit,
  onToggleAttendance: (String) -> Unit,
  modifier: Modifier = Modifier
) {
  var selectedTab by remember { mutableIntStateOf(0) } // 0: Redações, 1: Chamada

  val pendingCount = queue.count { it.status == CorrectionStep.PROFESSOR }
  val finishedCount = queue.count { it.status == CorrectionStep.PRONTA }

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .padding(horizontal = 20.dp)
      .padding(top = 16.dp, bottom = 100.dp)
  ) {
    // Top Teacher Header
    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Column {
        Text(
          text = "Área do Docente",
          color = TextSecondary,
          fontSize = 13.sp
        )
        Text(
          text = "Prof. Guilherme Ramos",
          color = TextPrimary,
          fontSize = 24.sp,
          fontWeight = FontWeight.Bold
        )
        Text(
          text = "Turma Extensivo ENEM · Sala 14 (Sábados)",
          color = PinkPrimary,
          fontSize = 13.sp,
          fontWeight = FontWeight.Medium
        )
      }

      Box(
        modifier = Modifier
          .size(46.dp)
          .clip(CircleShape)
          .background(PinkPrimary),
        contentAlignment = Alignment.Center
      ) {
        Icon(
          imageVector = Icons.Outlined.School,
          contentDescription = null,
          tint = Color.White,
          modifier = Modifier.size(24.dp)
        )
      }
    }

    Spacer(modifier = Modifier.height(18.dp))

    // Summary Metric Cards
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
      Surface(
        modifier = Modifier
          .weight(1f)
          .clip(RoundedCornerShape(16.dp)),
        shape = RoundedCornerShape(16.dp),
        color = Color.White,
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
      ) {
        Column(modifier = Modifier.padding(14.dp)) {
          Text("Para Corrigir", color = TextSecondary, fontSize = 12.sp)
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "$pendingCount",
            color = PinkPrimary,
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold
          )
        }
      }

      Surface(
        modifier = Modifier
          .weight(1f)
          .clip(RoundedCornerShape(16.dp)),
        shape = RoundedCornerShape(16.dp),
        color = Color.White,
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
      ) {
        Column(modifier = Modifier.padding(14.dp)) {
          Text("Concluídas", color = TextSecondary, fontSize = 12.sp)
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "$finishedCount",
            color = Color(0xFF10B981),
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold
          )
        }
      }

      Surface(
        modifier = Modifier
          .weight(1f)
          .clip(RoundedCornerShape(16.dp)),
        shape = RoundedCornerShape(16.dp),
        color = Color.White,
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
      ) {
        Column(modifier = Modifier.padding(14.dp)) {
          Text("Presença", color = TextSecondary, fontSize = 12.sp)
          Spacer(modifier = Modifier.height(4.dp))
          val presentRatio = (classRoll.count { it.isPresent } * 100) / classRoll.size.coerceAtLeast(1)
          Text(
            text = "$presentRatio%",
            color = TextPrimary,
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Sub-Tabs: Fila de Correção vs Chamada Presencial
    TabRow(
      selectedTabIndex = selectedTab,
      containerColor = Color.Transparent,
      contentColor = PinkPrimary,
      indicator = { tabPositions ->
        TabRowDefaults.SecondaryIndicator(
          modifier = Modifier.tabIndicatorOffset(tabPositions[selectedTab]),
          color = PinkPrimary,
          height = 3.dp
        )
      }
    ) {
      Tab(
        selected = selectedTab == 0,
        onClick = { selectedTab = 0 },
        text = {
          Text(
            text = "Fila de Correção ($pendingCount)",
            fontWeight = if (selectedTab == 0) FontWeight.Bold else FontWeight.Medium
          )
        }
      )
      Tab(
        selected = selectedTab == 1,
        onClick = { selectedTab = 1 },
        text = {
          Text(
            text = "Chamada de Sábado",
            fontWeight = if (selectedTab == 1) FontWeight.Bold else FontWeight.Medium
          )
        }
      )
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Tab Content
    if (selectedTab == 0) {
      // List of Submissions to Grade
      LazyColumn(
        verticalArrangement = Arrangement.spacedBy(12.dp),
        modifier = Modifier.fillMaxSize()
      ) {
        items(queue) { item ->
          TeacherSubmissionCard(item = item, onClick = { onSelectEssay(item) })
        }
      }
    } else {
      // Presencial Attendance Roll
      LazyColumn(
        verticalArrangement = Arrangement.spacedBy(10.dp),
        modifier = Modifier.fillMaxSize()
      ) {
        items(classRoll) { student ->
          AttendanceRollCard(
            student = student,
            onToggle = { onToggleAttendance(student.id) }
          )
        }
      }
    }
  }
}

@Composable
private fun TeacherSubmissionCard(
  item: TeacherEssayItem,
  onClick: () -> Unit
) {
  val isPending = item.status == CorrectionStep.PROFESSOR

  Surface(
    modifier = Modifier
      .fillMaxWidth()
      .clip(RoundedCornerShape(18.dp))
      .clickable(onClick = onClick)
      .testTag("teacher_essay_${item.id}"),
    shape = RoundedCornerShape(18.dp),
    color = Color.White,
    border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
    shadowElevation = 1.dp
  ) {
    Column(modifier = Modifier.padding(16.dp)) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Column {
          Text(
            text = item.studentName,
            color = TextPrimary,
            fontSize = 17.sp,
            fontWeight = FontWeight.Bold
          )
          Text(
            text = item.studentClass,
            color = TextSecondary,
            fontSize = 12.sp
          )
        }

        // Status Badge
        Box(
          modifier = Modifier
            .clip(RoundedCornerShape(12.dp))
            .background(if (isPending) PinkLight else Color(0xFFE8F5E9))
            .padding(horizontal = 10.dp, vertical = 4.dp)
        ) {
          Text(
            text = if (isPending) "Aguardando Correção" else "Nota Oficial Publicada",
            color = if (isPending) PinkPrimary else Color(0xFF2E7D32),
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold
          )
        }
      }

      Spacer(modifier = Modifier.height(10.dp))

      Text(
        text = "Tema: ${item.theme}",
        color = TextPrimary,
        fontSize = 14.sp,
        fontWeight = FontWeight.SemiBold
      )

      Spacer(modifier = Modifier.height(4.dp))

      Text(
        text = "Enviada: ${item.submittedAt} · Estimativa IA: ${item.aiScore} pts",
        color = TextSecondary,
        fontSize = 12.sp
      )

      Spacer(modifier = Modifier.height(12.dp))

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.End,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(
          text = if (isPending) "Abrir para corrigir" else "Ver detalhes",
          color = PinkPrimary,
          fontSize = 13.sp,
          fontWeight = FontWeight.SemiBold
        )
        Spacer(modifier = Modifier.width(4.dp))
        Icon(
          imageVector = Icons.AutoMirrored.Outlined.ArrowForwardIos,
          contentDescription = null,
          tint = PinkPrimary,
          modifier = Modifier.size(13.dp)
        )
      }
    }
  }
}

@Composable
private fun AttendanceRollCard(
  student: ClassRollStudent,
  onToggle: () -> Unit
) {
  Surface(
    modifier = Modifier.fillMaxWidth(),
    shape = RoundedCornerShape(16.dp),
    color = Color.White,
    border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp, vertical = 12.dp),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
          modifier = Modifier
            .size(38.dp)
            .clip(CircleShape)
            .background(if (student.isPresent) PinkLight else Color(0xFFF3F4F6)),
          contentAlignment = Alignment.Center
        ) {
          Text(
            text = student.name.take(1),
            color = if (student.isPresent) PinkPrimary else TextSecondary,
            fontWeight = FontWeight.Bold,
            fontSize = 16.sp
          )
        }
        Spacer(modifier = Modifier.width(12.dp))
        Column {
          Text(
            text = student.name,
            color = TextPrimary,
            fontSize = 15.sp,
            fontWeight = FontWeight.SemiBold
          )
          Text(
            text = "Chamada #${student.rollNumber}",
            color = TextSecondary,
            fontSize = 12.sp
          )
        }
      }

      Row(verticalAlignment = Alignment.CenterVertically) {
        Text(
          text = if (student.isPresent) "Presente" else "Ausente",
          color = if (student.isPresent) Color(0xFF10B981) else Color(0xFFEF4444),
          fontSize = 13.sp,
          fontWeight = FontWeight.SemiBold,
          modifier = Modifier.padding(end = 8.dp)
        )

        Switch(
          checked = student.isPresent,
          onCheckedChange = { onToggle() },
          colors = SwitchDefaults.colors(
            checkedThumbColor = Color.White,
            checkedTrackColor = PinkPrimary,
            uncheckedThumbColor = Color.White,
            uncheckedTrackColor = Color(0xFFD1D5DB)
          )
        )
      }
    }
  }
}
