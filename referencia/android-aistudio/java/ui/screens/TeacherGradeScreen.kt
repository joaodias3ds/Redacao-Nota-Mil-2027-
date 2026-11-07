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
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
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
import com.example.data.model.TeacherEssayItem
import com.example.ui.theme.BorderLight
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun TeacherGradeScreen(
  essay: TeacherEssayItem,
  onBack: () -> Unit,
  onPublishGrade: (c1: Int, c2: Int, c3: Int, c4: Int, c5: Int, notes: String) -> Unit,
  modifier: Modifier = Modifier
) {
  var c1 by remember { mutableIntStateOf(essay.c1) }
  var c2 by remember { mutableIntStateOf(essay.c2) }
  var c3 by remember { mutableIntStateOf(essay.c3) }
  var c4 by remember { mutableIntStateOf(essay.c4) }
  var c5 by remember { mutableIntStateOf(essay.c5) }
  var notes by remember { mutableStateOf(essay.teacherNotes) }

  val totalScore = c1 + c2 + c3 + c4 + c5
  val scrollState = rememberScrollState()

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .statusBarsPadding()
      .navigationBarsPadding()
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 10.dp, bottom = 40.dp)
  ) {
    // Top Bar
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(bottom = 16.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      IconButton(
        onClick = onBack,
        modifier = Modifier.size(40.dp)
      ) {
        Icon(
          imageVector = Icons.AutoMirrored.Outlined.ArrowBack,
          contentDescription = "Voltar",
          tint = TextPrimary
        )
      }
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        text = "Correção Oficial do Professor",
        color = TextPrimary,
        fontSize = 18.sp,
        fontWeight = FontWeight.Bold
      )
    }

    // Student & Essay Overview Card
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
    ) {
      Column(modifier = Modifier.padding(18.dp)) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Column {
            Text(
              text = essay.studentName,
              fontSize = 18.sp,
              fontWeight = FontWeight.Bold,
              color = TextPrimary
            )
            Text(
              text = essay.studentClass,
              fontSize = 12.sp,
              color = TextSecondary
            )
          }

          // Live Total Score Badge
          Surface(
            shape = RoundedCornerShape(12.dp),
            color = PinkPrimary
          ) {
            Text(
              text = "$totalScore / 1000",
              color = Color.White,
              fontSize = 16.sp,
              fontWeight = FontWeight.Bold,
              modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
            )
          }
        }

        Spacer(modifier = Modifier.height(10.dp))
        Text(
          text = "Tema: ${essay.theme}",
          fontSize = 14.sp,
          fontWeight = FontWeight.SemiBold,
          color = PinkPrimary
        )
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Essay Text Content (Read-Only)
    Text(
      text = "Texto do Aluno",
      fontSize = 15.sp,
      fontWeight = FontWeight.Bold,
      color = TextPrimary
    )
    Spacer(modifier = Modifier.height(8.dp))
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(16.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
    ) {
      Text(
        text = essay.text,
        fontSize = 14.sp,
        lineHeight = 22.sp,
        color = TextPrimary,
        modifier = Modifier.padding(16.dp)
      )
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Competency Scores Selectors
    Text(
      text = "Atribuição de Notas por Competência",
      fontSize = 15.sp,
      fontWeight = FontWeight.Bold,
      color = TextPrimary
    )
    Spacer(modifier = Modifier.height(10.dp))

    CompetencyGradeSelector("C1 · Norma Culta", c1) { c1 = it }
    CompetencyGradeSelector("C2 · Tema e Repertório", c2) { c2 = it }
    CompetencyGradeSelector("C3 · Argumentação", c3) { c3 = it }
    CompetencyGradeSelector("C4 · Coesão e Conectivos", c4) { c4 = it }
    CompetencyGradeSelector("C5 · Proposta de Intervenção", c5) { c5 = it }

    Spacer(modifier = Modifier.height(16.dp))

    // Pedagogical Feedback for Plantão Presencial
    Text(
      text = "Comentários Pedagógicos para o Aluno",
      fontSize = 15.sp,
      fontWeight = FontWeight.Bold,
      color = TextPrimary
    )
    Spacer(modifier = Modifier.height(8.dp))
    OutlinedTextField(
      value = notes,
      onValueChange = { notes = it },
      modifier = Modifier
        .fillMaxWidth()
        .height(120.dp)
        .testTag("input_teacher_notes"),
      placeholder = { Text("Orientações para o plantão presencial de sábado...") },
      shape = RoundedCornerShape(14.dp),
      colors = OutlinedTextFieldDefaults.colors(
        focusedBorderColor = PinkPrimary,
        unfocusedBorderColor = BorderLight
      )
    )

    Spacer(modifier = Modifier.height(24.dp))

    // Submit Official Grade Button
    Button(
      onClick = { onPublishGrade(c1, c2, c3, c4, c5, notes) },
      modifier = Modifier
        .fillMaxWidth()
        .height(54.dp)
        .testTag("btn_publish_teacher_grade"),
      shape = RoundedCornerShape(27.dp),
      colors = ButtonDefaults.buttonColors(
        containerColor = PinkPrimary,
        contentColor = Color.White
      )
    ) {
      Text(
        text = "Publicar Nota Oficial ($totalScore pts)",
        fontSize = 16.sp,
        fontWeight = FontWeight.Bold
      )
    }
  }
}

@Composable
private fun CompetencyGradeSelector(
  name: String,
  currentValue: Int,
  onSelect: (Int) -> Unit
) {
  val options = listOf(80, 120, 160, 200)

  Column(
    modifier = Modifier
      .fillMaxWidth()
      .padding(vertical = 6.dp)
  ) {
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Text(text = name, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
      Text(text = "$currentValue pts", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = PinkPrimary)
    }
    Spacer(modifier = Modifier.height(4.dp))
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
      options.forEach { score ->
        val isSelected = currentValue == score
        Surface(
          modifier = Modifier
            .weight(1f)
            .height(36.dp)
            .clip(RoundedCornerShape(10.dp))
            .clickable { onSelect(score) },
          shape = RoundedCornerShape(10.dp),
          color = if (isSelected) PinkPrimary else Color.White,
          border = androidx.compose.foundation.BorderStroke(1.dp, if (isSelected) PinkPrimary else BorderLight)
        ) {
          Box(contentAlignment = Alignment.Center) {
            Text(
              text = "$score",
              color = if (isSelected) Color.White else TextPrimary,
              fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
              fontSize = 13.sp
            )
          }
        }
      }
    }
  }
}
