package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ExitToApp
import androidx.compose.material.icons.outlined.LocationOn
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Phone
import androidx.compose.material.icons.outlined.School
import androidx.compose.material.icons.outlined.Security
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.StudentProfile
import com.example.ui.theme.BorderLight
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun PerfilScreen(
  profile: StudentProfile,
  onLogout: () -> Unit,
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()
  var showTermsDialog by remember { mutableStateOf(false) }
  var showSupportDialog by remember { mutableStateOf(false) }

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 16.dp, bottom = 100.dp)
  ) {
    // Top Title
    Text(
      text = "Meu Perfil",
      color = TextPrimary,
      fontSize = 26.sp,
      fontWeight = FontWeight.Bold
    )

    Spacer(modifier = Modifier.height(20.dp))

    // Profile Header Card
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
      shadowElevation = 1.dp
    ) {
      Row(
        modifier = Modifier.padding(20.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        // Avatar circle
        Box(
          modifier = Modifier
            .size(64.dp)
            .clip(CircleShape)
            .background(PinkPrimary),
          contentAlignment = Alignment.Center
        ) {
          Text(
            text = "M",
            color = Color.White,
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold
          )
        }

        Spacer(modifier = Modifier.width(16.dp))

        Column {
          Text(
            text = profile.fullName,
            color = TextPrimary,
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold
          )
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = profile.email,
            color = TextSecondary,
            fontSize = 14.sp
          )
          Spacer(modifier = Modifier.height(8.dp))
          Box(
            modifier = Modifier
              .clip(RoundedCornerShape(10.dp))
              .background(PinkLight)
              .padding(horizontal = 8.dp, vertical = 3.dp)
          ) {
            Text(
              text = "ALUNO PRESENCIAL",
              color = PinkPrimary,
              fontSize = 11.sp,
              fontWeight = FontWeight.Bold
            )
          }
        }
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Section "Turma & Sala Presencial"
    Text(
      text = "Curso Presencial",
      color = TextPrimary,
      fontSize = 16.sp,
      fontWeight = FontWeight.Bold
    )

    Spacer(modifier = Modifier.height(10.dp))

    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
      shadowElevation = 1.dp
    ) {
      Column(
        modifier = Modifier.padding(18.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
      ) {
        ProfileInfoRow(
          icon = Icons.Outlined.School,
          title = "Turma",
          value = profile.courseName
        )
        ProfileInfoRow(
          icon = Icons.Outlined.LocationOn,
          title = "Unidade & Sala",
          value = "${profile.room} · ${profile.schedule}"
        )
        ProfileInfoRow(
          icon = Icons.Outlined.Person,
          title = "Professor Responsável",
          value = profile.teacher
        )
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Section "Responsável e Termos"
    Text(
      text = "Autorização & Segurança",
      color = TextPrimary,
      fontSize = 16.sp,
      fontWeight = FontWeight.Bold
    )

    Spacer(modifier = Modifier.height(10.dp))

    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(20.dp))
        .clickable { showTermsDialog = true },
      shape = RoundedCornerShape(20.dp),
      color = Color(0xFFFFF0F5)
    ) {
      Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        Icon(
          imageVector = Icons.Outlined.Security,
          contentDescription = null,
          tint = PinkPrimary,
          modifier = Modifier.size(24.dp)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
          Text(
            text = "Termo de Responsabilidade",
            color = TextPrimary,
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
          )
          Spacer(modifier = Modifier.height(2.dp))
          Text(
            text = "Autorização de menor validada na matrícula presencial.",
            color = TextSecondary,
            fontSize = 12.sp
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    // Section "Atendimento e Secretaria"
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(20.dp))
        .clickable { showSupportDialog = true },
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight)
    ) {
      Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        Icon(
          imageVector = Icons.Outlined.Phone,
          contentDescription = null,
          tint = PinkPrimary,
          modifier = Modifier.size(24.dp)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
          Text(
            text = "Falar com a Secretaria do Curso",
            color = TextPrimary,
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
          )
          Spacer(modifier = Modifier.height(2.dp))
          Text(
            text = "Horários, dúvidas e agendamento de plantões.",
            color = TextSecondary,
            fontSize = 12.sp
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(30.dp))

    // Logout Button
    OutlinedButton(
      onClick = onLogout,
      modifier = Modifier
        .fillMaxWidth()
        .height(52.dp)
        .testTag("btn_logout"),
      shape = RoundedCornerShape(26.dp),
      border = androidx.compose.foundation.BorderStroke(1.5.dp, Color(0xFFEF4444)),
      colors = ButtonDefaults.outlinedButtonColors(contentColor = Color(0xFFEF4444))
    ) {
      Icon(
        imageVector = Icons.AutoMirrored.Outlined.ExitToApp,
        contentDescription = "Sair",
        modifier = Modifier.size(18.dp)
      )
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        text = "Sair da conta",
        fontSize = 15.sp,
        fontWeight = FontWeight.SemiBold
      )
    }
  }

  if (showTermsDialog) {
    AlertDialog(
      onDismissRequest = { showTermsDialog = false },
      title = { Text("Termo de Responsabilidade e Menoridade") },
      text = {
        Text("Em conformidade com a LGPD e o regulamento do curso presencial de redação, os dados cadastrais e as correções pedagógicas foram devidamente autorizados pelo responsável legal registrado na matrícula.")
      },
      confirmButton = {
        TextButton(onClick = { showTermsDialog = false }) {
          Text("Entendido", color = PinkPrimary)
        }
      }
    )
  }

  if (showSupportDialog) {
    AlertDialog(
      onDismissRequest = { showSupportDialog = false },
      title = { Text("Secretaria do Curso") },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
          Text("WhatsApp: (11) 98765-4321")
          Text("E-mail: suporte@appredacao.com.br")
          Text("Recepção Presencial: Andar 1, Bloco A")
        }
      },
      confirmButton = {
        TextButton(onClick = { showSupportDialog = false }) {
          Text("OK", color = PinkPrimary)
        }
      }
    )
  }
}

@Composable
private fun ProfileInfoRow(
  icon: ImageVector,
  title: String,
  value: String
) {
  Row(verticalAlignment = Alignment.Top) {
    Icon(
      imageVector = icon,
      contentDescription = null,
      tint = PinkPrimary,
      modifier = Modifier.size(20.dp)
    )
    Spacer(modifier = Modifier.width(12.dp))
    Column {
      Text(
        text = title,
        color = TextSecondary,
        fontSize = 12.sp
      )
      Spacer(modifier = Modifier.height(2.dp))
      Text(
        text = value,
        color = TextPrimary,
        fontSize = 14.sp,
        fontWeight = FontWeight.Medium
      )
    }
  }
}
